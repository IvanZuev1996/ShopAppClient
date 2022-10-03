import React from 'react';
import { useInput } from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../../redux/userRedux';
import { userRequest } from '../../requestMethods';

const Profile = ({ setModal, setPasswordModal }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const name = useInput(`${user.name ? user.name : ''}`, {});
  const lastName = useInput(`${user.lastname ? user.lastname : ''}`, {});
  const userName = useInput(`${user.username}`, { isEmpty: false });
  const email = useInput(`${user.email}`, { isEmpty: false, isEmail: true });

  const updateUser = async () => {
    try {
      const res = await userRequest(user.accessToken).put(
        `/users/${user._id}`,
        {
          username: userName.value,
          email: email.value,
          name: name.value,
          lastname: lastName.value,
        }
      );
      dispatch(updateCurrentUser(res.data));
      setModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="user-info-wrapper">
        <h2 className="tabs-name">Profile</h2>
        <div className="user-info">
          <p className="user-input-title">Name</p>
          <input
            type="text"
            className="user-input"
            placeholder="Name"
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
          />
        </div>
        <div className="user-info">
          <p className="user-input-title">LastName</p>
          <input
            type="text"
            className="user-input"
            placeholder="LastName"
            value={lastName.value}
            onChange={lastName.onChange}
            onBlur={lastName.onBlur}
          />
        </div>
        <div className="user-info">
          <p className="user-input-title">UserName</p>
          <input
            type="text"
            className="user-input"
            placeholder="UserName"
            value={userName.value}
            onChange={userName.onChange}
            onBlur={userName.onBlur}
          />
        </div>
        {userName.isDirty && userName.isEmpty && (
          <div
            className="not-valid-massange"
            style={{ textAlign: 'center', marginTop: '10px' }}
          >
            Поле не может быть пустым
          </div>
        )}
        <div className="user-info">
          <p className="user-input-title">Email</p>
          <input
            type="text"
            className="user-input"
            placeholder="Email"
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            required
          />
        </div>
        {email.isDirty && email.emailError && (
          <div
            className="not-valid-massange"
            style={{ textAlign: 'center', marginTop: '10px' }}
          >
            Введите корректный email
          </div>
        )}
        <div className="save-btn-wrapper">
          <button
            className="save-info-btn"
            disabled={!email.inputValid || !userName.inputValid}
            onClick={updateUser}
          >
            Save
          </button>
        </div>
        <div className="change-password-wrapper">
          <p
            className="change-password-link"
            onClick={() => setPasswordModal(true)}
          >
            Change password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
