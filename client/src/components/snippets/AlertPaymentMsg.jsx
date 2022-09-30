import React from "react";

const AlertPaymentMsg = ({ valid = false, msg = "" }) => (
   <>
      <i className={`fa-solid fa-circle-${valid ? "check" : "xmark"}`}></i> {msg}
   </>
);

export default AlertPaymentMsg;
