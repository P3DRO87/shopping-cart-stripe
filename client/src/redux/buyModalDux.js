const initialState = {
   isModalActive: false,
};

export const buyModalReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_IS_MODAL_ACTIVE":
         return { ...state, isModalActive: payload };

      default:
         return state;
   }
};

export const setIsModalActive = (isActive) => ({
   type: "SET_IS_MODAL_ACTIVE",
   payload: isActive,
});
