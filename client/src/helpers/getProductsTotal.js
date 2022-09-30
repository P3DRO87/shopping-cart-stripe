export const getProductsTotal = (products) => {
   return products.reduce((acc, { amount, price }) => acc + amount * price, 0);
};
