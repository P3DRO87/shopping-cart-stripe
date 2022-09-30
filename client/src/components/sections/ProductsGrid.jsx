import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../snippets/ProductItem";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

const ProductsGrid = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      axios.get(PRODUCTS_URL).then(({ data: products }) => setProducts(products));
   }, []);

   return (
      <>
         {!products.length && (
            <div className="loader-container d-flex justify-content-center mt-2">
               <img src="./media/loader.svg" alt="" />
            </div>
         )}
         {products.map((product) => (
            <ProductItem key={product.id} {...product} />
         ))}
      </>
   );
};

export default ProductsGrid;
