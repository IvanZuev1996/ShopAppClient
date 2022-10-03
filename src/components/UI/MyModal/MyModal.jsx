import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const MyModal = ({ modal, setModal }) => {
  return (
    <div>
      {modal && (
        <div className="update-user-modal" onClick={() => setModal(false)}>
          <div className="modal-message" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Ваши изменения успешно сохранены</div>
            <div className="close-modal-btn">
              <CloseOutlinedIcon
                style={{ width: '30px', height: '30px' }}
                onClick={() => setModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyModal;
