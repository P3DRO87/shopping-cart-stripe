import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsTotal } from "../../helpers/getProductsTotal";
import { setIsModalActive } from "../../redux/buyModalDux";
import { setIsPanelActive } from "../../redux/cartPanelDux";
import { emptyProductsInCart, setProductsTotal } from "../../redux/productsDux";
import CartPanelItem from "../snippets/CartPanelItem";

const SideCartPanel = () => {
   const dispatch = useDispatch();

   const { productsInCart } = useSelector((state) => state.products);

   const { isPanelActive } = useSelector((state) => state.cartPanel);

   const handleClosePanel = ({ target }) => {
      const isCloseBtns =
         target.matches(".close-btn i") || target.matches(".cart-panel-mask");

      if (!isCloseBtns) return;

      dispatch(setIsPanelActive(false));
   };

   const handleEmptyCart = () => dispatch(emptyProductsInCart());

   const handleOPenBuyModal = () => {
      if (!getProductsTotal(productsInCart)) return;

      dispatch(setIsModalActive(true));
   };

   return (
      <div
         onClick={handleClosePanel}
         className={`cart-panel-mask${isPanelActive ? " active" : ""}`}
      >
         <div className="panel-menu">
            <div onClick={handleClosePanel} className="close-btn">
               <i className="fas fa-times"></i>
            </div>
            <div className="empty-cart-btn-container">
               <button onClick={handleEmptyCart} className="btn">
                  Empty Cart
               </button>
            </div>
            <div className="table-container">
               <table className="table">
                  <thead>
                     <tr>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                     </tr>
                  </thead>
                  <tbody>
                     {productsInCart.map((product) => (
                        <CartPanelItem key={product.id} {...product} />
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="total-section">
               <div className="shopping-total-container">
                  <h3>
                     Total: $
                     {!productsInCart.length
                        ? 0
                        : getProductsTotal(productsInCart).toFixed(2)}
                  </h3>
               </div>
               <button onClick={handleOPenBuyModal} className="btn-buy-all">
                  Go to buy
               </button>
            </div>
         </div>
      </div>
   );
};

export default SideCartPanel;
