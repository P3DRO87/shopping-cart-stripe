import React from "react";
import { useDispatch } from "react-redux";
import { addProductInCart, decreaseProductAmount } from "../../redux/productsDux";

const CartPanelItem = (product) => {
   const dispatch = useDispatch();

   const handleDecreaseAmount = () => {
      if (product.amount === 1) return;

      dispatch(decreaseProductAmount({ productId: product.id, amount: -1 }));
   };

   const handleIncreaseAmount = () => {
      product.amount + 1 <= 999 && dispatch(addProductInCart(product));
   };

   const handleDeleteProduct = () => {
      dispatch(decreaseProductAmount({ productId: product.id, amount: 0 }));
   };

   return (
      <tr className="cart-panel-item">
         <td className="img-container">
            <img src={product.image} alt="" />
         </td>
         <td title={product.title} className="product-title">
            <p>{product.title}</p>
         </td>
         <td className="product-price text-center">${product.price}</td>
         <td className="text-center price-section">
            <div className="amount-controller">
               <button onClick={handleDecreaseAmount}>-</button>
               <p className="product-amount">{product.amount}</p>
               <button onClick={handleIncreaseAmount}>+</button>
            </div>
            <button onClick={handleDeleteProduct} className="delete-product-btn">
               <i className="fas fa-times remove-product-btn" aria-hidden="true"></i>
            </button>
         </td>
      </tr>
   );
};

export default CartPanelItem;
