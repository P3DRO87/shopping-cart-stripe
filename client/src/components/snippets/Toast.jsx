import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastActive } from "../../redux/toastDux";

const Toast = ({ children }) => {
   const dispatch = useDispatch();

   const { toastContent, isToastActive } = useSelector((state) => state.toast);

   useEffect(() => {
      if (toastContent) dispatch(setIsToastActive(true));
   }, [toastContent]);

   useEffect(() => {
      let timeout;

      if (isToastActive) {
         timeout = setTimeout(() => {
            dispatch(setIsToastActive(false));
         }, 3000);
      }

      return () => clearTimeout(timeout);
   }, [isToastActive]);

   return (
      <div className={`custom-toast${isToastActive ? " active" : ""}`}>{children}</div>
   );
};

export default Toast;

// arr.reduce((acc, value) => ((acc[value] = acc[value] + 1 || 1), acc), {});
