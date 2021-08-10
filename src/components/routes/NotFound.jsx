import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import oops from "../../images/oops.jpg";


const NotFound = () => {
	const [tick, setTick] = useState(3);

	useEffect(() => {
		let timer = setInterval(() => {
			setTick(tick => tick-1);
		},1000)

		return (() => clearInterval(timer));
	}, [tick])


	return (
		<div style={{width: '100vw', height: '100vh'}}>
		{tick>0
		? <div>
			<img src={oops} alt="oops" className="mt-4" style={{width: "60%", height: "60%"}} />
			<h1 className="mt-4" style={{color: "red", fontSize: "2em"}}>Page not Found!!</h1>
			<h3 className="mt-4" style={{color: 'blue'}}>Redirecting in..... {tick} </h3>
			</div>
		: <Redirect to="/" />
		}
		</div>
	)
}

export default NotFound
