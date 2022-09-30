import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router } from "react-router-dom";
import ElementsRoutes from "./components/routers/ElementsRoutes";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

const { VITE_STRIPE_PUBLIC_KEY } = import.meta.env;

const stripeRes = loadStripe(VITE_STRIPE_PUBLIC_KEY);

console.log("You can use this test card: 4242 4242 4242 4242");

const App = () => {
   const store = generateStore();

   return (
      <Router>
         <Elements options={{ locale: "en" }} stripe={stripeRes}>
            <Provider store={store}>
               <ElementsRoutes />
            </Provider>
         </Elements>
      </Router>
   );
};

export default App;
