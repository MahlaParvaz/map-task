import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleGoToInformation = () => {
    navigate('/addresses');
  };

  return (
    <div className="confirmation-container">
      <img src="/Group.svg" alt="success" className="navbar-logo" />

      <h3>آدرس شما با موفقیت ثبت شد!</h3>
      <button className="btn btn--secondary" onClick={handleGoToInformation}>
        مشاهده اطلاعات
      </button>
    </div>
  );
};

export default ConfirmationPage;
