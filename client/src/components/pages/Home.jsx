import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsTotal } from "../../helpers/getProductsTotal";
import { setIsModalActive } from "../../redux/buyModalDux";
import { setProductsTotal } from "../../redux/productsDux";
import BuyForm from "../sections/BuyForm";
import Header from "../sections/Header";
import ProductsGrid from "../sections/ProductsGrid";
import SideCartPanel from "../sections/SideCartPanel";
import Toast from "../snippets/Toast";
import Modal from "../utilities/Modal";

const Home = () => {
   const dispatch = useDispatch();

   const { productsInCart } = useSelector((state) => state.products);

   const { isModalActive } = useSelector((state) => state.buyModal);

   const { toastContent } = useSelector((state) => state.toast);

   useEffect(() => {
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
   }, [productsInCart]);

   useEffect(() => {
      dispatch(setProductsTotal(getProductsTotal(productsInCart)));
   }, [productsInCart, dispatch]);

   return (
      <>
         <Header />
         <SideCartPanel />
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-sm-auto">
                  <h2 className="text-center mt-3">Product list</h2>
               </div>
            </div>
            <div className="row">
               <ProductsGrid />
            </div>
         </div>
         <Toast>{toastContent}</Toast>
         <Modal
            onClose={() => dispatch(setIsModalActive(false))}
            isModalActive={isModalActive}
         >
            <BuyForm />
         </Modal>
      </>
   );
};

export default Home;
