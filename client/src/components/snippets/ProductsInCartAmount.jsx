import { useSelector } from "react-redux";

const getProductsInCartLength = (products) => {
   return products.reduce((acc, { amount }) => acc + amount, 0);
};

const getProductText = (products) => {
   return `${
      getProductsInCartLength(products) === 1
         ? "1 item"
         : `${getProductsInCartLength(products)} items`
   }`;
};

const ProductsInCartAmount = () => {
   const { productsInCart } = useSelector((state) => state.products);

   return <>{getProductText(productsInCart) || "0 Items"} in cart</>;
};

export default ProductsInCartAmount;
