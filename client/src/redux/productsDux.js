const productsInCartLs = JSON.parse(localStorage.getItem("productsInCart")) || [];

const initialState = {
   productsInCart: productsInCartLs,
   productsTotal: 0,
};

export const productsReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_PRODUCTS_IN_CART":
         return { ...state, productsInCart: payload };

      case "SET_PRODUCTS_TOTAL":
         return { ...state, productsTotal: payload };

      case "ADD_PRODUCT_IN_CART":
         const { productsInCart } = state;

         const isRepeatedProduct = productsInCart.some(
            (product) => product.id === payload.id
         );

         const productsWithNewAmount = productsInCart.map((product) =>
            product.id === payload.id
               ? { ...product, amount: product.amount + 1 }
               : product
         );

         return {
            ...state,
            productsInCart: isRepeatedProduct
               ? productsWithNewAmount
               : [...productsInCart, { ...payload, amount: 1 }],
         };

      case "DECREASE_PRODUCT_AMOUNT":
         const { productId, amount } = payload;

         const decreasedProducts = state.productsInCart.map((product) => {
            return product.id === productId
               ? { ...product, amount: amount === 0 ? 0 : product.amount + amount }
               : product;
         });

         const productsWithAmount = decreasedProducts.filter(({ amount }) => amount > 0);

         return {
            ...state,
            productsInCart: productsWithAmount,
         };

      case "EMPTY_PRODUCTS_IN_CART":
         return { ...state, productsInCart: [] };

      default:
         return state;
   }
};

export const setProductsInCart = (products) => ({
   type: "SET_PRODUCTS_IN_CART",
   payload: products,
});

export const setProductsTotal = (total) => ({
   type: "SET_PRODUCTS_TOTAL",
   payload: total,
});

export const addProductInCart = (product) => ({
   type: "ADD_PRODUCT_IN_CART",
   payload: product,
});

export const decreaseProductAmount = (productId) => ({
   type: "DECREASE_PRODUCT_AMOUNT",
   payload: productId,
});

export const emptyProductsInCart = () => ({ type: "EMPTY_PRODUCTS_IN_CART" });
