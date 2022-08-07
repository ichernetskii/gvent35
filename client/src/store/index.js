import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./store.js";

export default configureStore({
    reducer: { rootReducer }
});
