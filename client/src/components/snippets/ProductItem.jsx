import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductInCart } from "../../redux/productsDux";
import { setToastContent } from "../../redux/toastDux";
import ProductsInCartAmount from "./ProductsInCartAmount";

const ProductItem = (product) => {
   const dispatch = useDispatch();

   const { id, image, title, price, rating } = product;

   const [starRatingW, setStarRatingW] = useState(0);

   const starRatingRef = useRef();

   useEffect(() => {
      if (!starRatingRef.current) return;

      setStarRatingW(starRatingRef.current.offsetWidth);
   }, [starRatingRef.current]);

   const handleAddProduct = () => {
      dispatch(addProductInCart(product));

      dispatch(setToastContent(<ProductsInCartAmount />));
   };

   return (
      <div key={id} className="col-lg-4 col-md-6">
         <div className="card product-card-item">
            <div style={{ backgroundImage: `url(${image})` }} className="img-container">
               <div className="background-img-cover"></div>
               <img src={image} className="card-img-top" alt="" />
            </div>
            <div className="card-body">
               <h5 className="card-title">{title}</h5>
               <p className="card-text">Category: men's clothing</p>
               <div
                  style={{ width: ((rating.rate * 2) / 5) * starRatingW }}
                  className="star-ratings"
               >
                  <div className="fill-ratings">
                     <span ref={starRatingRef}>★★★★★</span>
                  </div>
                  <div className="empty-ratings">
                     <span>★★★★★</span>
                  </div>
               </div>
               <p className="product-price">${price}</p>
               <div className="w-100 d-flex">
                  <button onClick={handleAddProduct} className="btn-add">
                     Add to Cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductItem;
