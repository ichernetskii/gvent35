import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "intersection-observer";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

// React
import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

// Redux
import {Provider} from "react-redux";
import store from "../store";

// Components
const App = React.lazy(() => import("components/app"));

// SCSS
import "style/global.scss";
import "style/fonts.scss";

ReactDOM.render(<Suspense fallback={
    <div className="startup-loader" style={{animation: "loader 1s forwards"}} />
}>
    <Router basename={`${process.env.BASE_PATH}`}>
        <Provider store={store}>
			<App />
        </Provider>
    </Router>
</Suspense>, document.getElementById("root"));
