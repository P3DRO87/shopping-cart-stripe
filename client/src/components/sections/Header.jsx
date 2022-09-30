import React from "react";
import { useDispatch } from "react-redux";
import { setIsPanelActive } from "../../redux/cartPanelDux";

const Header = () => {
   const dispatch = useDispatch();

   const handleOpenPanel = () => dispatch(setIsPanelActive(true));

   return (
      <div className="header">
         <div className="container-fluid">
            <div className="row align-items-center justify-content-between">
               <div className="col-sm-auto">
                  <h1>Shopping cart - local storage</h1>
               </div>
               <div className="col-sm-auto">
                  <div className="menu-cart-button-container">
                     <button onClick={handleOpenPanel}>
                        <i className="fa-brands fa-opencart"></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
