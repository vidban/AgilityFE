import React from "react";
import { Switch, Route } from "react-router-dom";
import Reroute from "./Reroute";
import LoginSignUp from "../auth/LoginSignUp";
import MyCalendar from "../pages/calendar/MyCalendar";
import Home from "../pages/home/Home";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";
import EventProvider from "../../context/EventProvider";

const Routes = () => {

	return (
		<Switch>
		  <Route exact path='/' component={Reroute} />
		  <Route exact path='/login' component={LoginSignUp} />
			<EventProvider >
				<PrivateRoute exact path="/home">
					<Home />
				</PrivateRoute>
				<PrivateRoute exact path="/calendar">
					<MyCalendar />
				</PrivateRoute>
			</EventProvider>
			<Route component={NotFound} />
		</Switch>
	);
  };
  
  export default Routes;
  