import {
   legacy_createStore as createStore,
   combineReducers,
   compose,
   applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { buyModalReducer } from "./buyModalDux";
import { cartPanelReducer } from "./cartPanelDux";
import { productsReducer } from "./productsDux";
import { toastReducer } from "./toastDux";

const rootReducer = combineReducers({
   products: productsReducer,
   cartPanel: cartPanelReducer,
   buyModal: buyModalReducer,
   toast: toastReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
   const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
   return store;
}
