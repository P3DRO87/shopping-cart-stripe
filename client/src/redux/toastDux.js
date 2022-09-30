const initialState = {
   isToastActive: false,
   toastContent: "",
};

export const toastReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_TOAST_CONTENT":
         return { ...state, toastContent: payload };

      case "SET_IS_TOAST_ACTIVE":
         return { ...state, isToastActive: payload };

      default:
         return state;
   }
};

export const setToastContent = (content) => ({
   type: "SET_TOAST_CONTENT",
   payload: content,
});

export const setIsToastActive = (isActive) => ({
   type: "SET_IS_TOAST_ACTIVE",
   payload: isActive,
});
