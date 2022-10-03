import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useInput } from '../../../hooks/useInput';
import { userRequest } from '../../../requestMethods';
import EmptyInput from '../inputErrors/EmptyInput';
import NotMatchValue from '../inputErrors/NotMatchValue';
import NotValidInput from '../inputErrors/NotValidInput';
import MyButton from '../MyButton/MyButton';
import MyInput from '../MyInput/MyInput';
import MyModal from './MyModal';

const ChangePasswordModal = ({ modal, setModal }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const oldPassword = useInput('', { isEmpty: true });
  const newPassword = useInput('', { isEmpty: true });
  const confirmPassword = useInput('', { isEmpty: true });

  const closeModal = () => {
    setModal(false);
    setPasswordError(false);
    setConfirmError(false);
  };

  const handleClick = async () => {
    if (newPassword.value === confirmPassword.value) {
      try {
        await userRequest(user.accessToken).put(`/users/${user._id}`, {
          oldPassword: oldPassword.value,
          password: newPassword.value,
        });
        setModal(false);
        setSuccessModal(true);
      } catch (error) {
        setPasswordError(true);
      }
    } else {
      setConfirmError(true);
    }
    oldPassword.restartInput();
    newPassword.restartInput();
    confirmPassword.restartInput();
  };

  return (
    <div>
      {successModal && (
        <MyModal modal={successModal} setModal={setSuccessModal} />
      )}
      {modal && (
        <div className="update-user-modal" onClick={closeModal}>
          <div
            className="modal-password-massage"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="main-modal-title">Change your password...</div>
            <div className="change-password-inputs">
              <MyInput
                element={oldPassword}
                title="Old password"
                setPasswordError={setPasswordError}
              />
              <EmptyInput element={oldPassword} />
              <NotValidInput condition={passwordError} />
              <MyInput
                element={newPassword}
                title="New password"
                setConfirmError={setConfirmError}
              />
              <EmptyInput element={newPassword} />
              <NotMatchValue condition={confirmError} />
              <MyInput
                element={confirmPassword}
                title="Confirm password"
                setConfirmError={setConfirmError}
              />
              <EmptyInput element={confirmPassword} />
            </div>
            <MyButton
              disabledCondition={
                !oldPassword.inputValid ||
                !newPassword.inputValid ||
                !confirmPassword.inputValid
              }
              title="Change password"
              handleClick={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordModal;
