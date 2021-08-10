import React from "react";

const Alert = ({ type = "danger", message = "" }) => {
  return (
    <div className={`alert alert-${type} mb-0`} role='alert'>
      <small className='mb-0 small'>{message}</small>
    </div>
  );
};

export default Alert;
