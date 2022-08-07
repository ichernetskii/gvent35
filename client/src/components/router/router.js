import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

// Components
import HomePage from "components/pages/home-page";

// data
import data from "js/assets/data.js";

const Router = () => (
	<Switch>
		<Route path="/" exact>
			<HomePage menuItems={data.menuItems} />
		</Route>
		{
			data.menuItems.map(item => <Route path={`${item.href}`} key={item.href} >
				<item.component />
			</Route>)
		}
		<Redirect to="/" />
	</Switch>
)

export default Router;
