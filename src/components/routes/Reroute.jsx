import React, {useContext} from 'react';
import {Redirect} from "react-router-dom";
import UserContext from "../../context/UserContext";


const Reroute = () => {
	const {currentUser} = useContext(UserContext);

	return !currentUser ? <Redirect to="/login" /> : <Redirect to="/home"/>;
}

export default Reroute
