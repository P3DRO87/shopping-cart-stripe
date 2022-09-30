import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsTotal } from "../../helpers/getProductsTotal";
import axios from "axios";
import { setToastContent } from "../../redux/toastDux";
import AlertPaymentMsg from "../snippets/AlertPaymentMsg";
import { setIsModalActive } from "../../redux/buyModalDux";
import { setIsPanelActive } from "../../redux/cartPanelDux";
import { setProductsInCart } from "../../redux/productsDux";

const { VITE_SEVER_URL } = import.meta.env;

const BuyForm = () => {
   const dispatch = useDispatch();

   const stripe = useStripe();

   const elements = useElements();

   const { productsInCart } = useSelector((state) => state.products);

   const [isPaymentLoading, setIsPaymentLoading] = useState(false);

   const handleBuyAll = async (e) => {
      e.preventDefault();

      setIsPaymentLoading(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card: elements.getElement(CardElement),
      });

      if (error) {
         setIsPaymentLoading(false);
         return dispatch(setToastContent(<AlertPaymentMsg msg={error.message} />));
      }

      const { id } = paymentMethod;

      const parseAmount = +(getProductsTotal(productsInCart).toFixed(2) * 100).toFixed(2);

      const amountData = { id, amount: parseAmount };

      const SERVER_URL = `${VITE_SEVER_URL}/checkout`;

      axios
         .post(SERVER_URL, amountData)
         .then(({ data }) => {
            dispatch(setToastContent(<AlertPaymentMsg valid msg={data.msg} />));
            dispatch(setIsPanelActive(false));
            dispatch(setIsModalActive(false));
            dispatch(setProductsInCart([]));
         })
         .catch(({ response }) =>
            dispatch(setToastContent(<AlertPaymentMsg msg={response.data.error} />))
         )
         .finally(() => setIsPaymentLoading(false));
   };

   return (
      <div className="buy-form">
         <form onSubmit={handleBuyAll}>
            <CardElement
               options={{
                  style: {
                     base: {
                        color: "#fff",
                     },
                  },
               }}
               className="stripe-card-element"
            />
            <div className="total-section">
               <h3 className="total">
                  <span>Total</span>
                  <span>${getProductsTotal(productsInCart).toFixed(2)}</span>
               </h3>

               {isPaymentLoading && (
                  <button className="buy-all">
                     <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                     ></span>
                     <span className="ms-3">Loading...</span>
                  </button>
               )}
               {!isPaymentLoading && (
                  <input
                     disabled={!stripe}
                     className="buy-all"
                     type="submit"
                     value={"Confirm and pay"}
                  />
               )}
            </div>
         </form>
      </div>
   );
};

export default BuyForm;
