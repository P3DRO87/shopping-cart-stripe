const initialState = {
   isPanelActive: false,
};

export const cartPanelReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_IS_PANEL_ACTIVE":
         return { ...state, isPanelActive: payload };

      default:
         return state;
   }
};

export const setIsPanelActive = (isPanelActive) => ({
   type: "SET_IS_PANEL_ACTIVE",
   payload: isPanelActive,
});
