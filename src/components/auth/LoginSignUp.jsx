import React, {useContext, useState, useEffect} from 'react';
import { Redirect } from 'react-router';
import agileBluert from "../../images/agilebluert.png";
import gears from "../../images/gears.gif";
import Login from "./Login";
import styles from "./LoginSignUp.module.css";
import UserContext from "../../context/UserContext";

const LoginSignUp = () => {
	const {currentUser} = useContext(UserContext);
	const [message, setMessage] = useState('');
	const [currIndex, setCurrIndex] = useState(0);
	const [showSignIn, setShowSignIn] = useState(false);
	const [currentView, setCurrentView] = useState('login');


	useEffect(() => {
		let msg = 'Set manageable Goals. Be adaptable. Plan ahead. Make tasks detailed. Get Inspired!';
		if (currIndex<msg.length){
			setTimeout(() => {
				setMessage(message => message+msg[currIndex]);
				setCurrIndex(currIndex+1);
			},20);
		}
	}, [currIndex])
	
	useEffect(() => {
		let timedMessage = setTimeout(() => {
			setShowSignIn(true);
		}, 3000);
	
		return () => clearTimeout(timedMessage);
	},[])

	if(currentUser){
		return <Redirect to="/"/>
	}

	const handleViewChange = (e) => {
		let tempWord = e.target.innerText.toLowerCase();
		let btnClicked = [...tempWord].filter((c) => c!== " ").join("");
		if(btnClicked === currentView){
			return;
		}
		currentView === 'login' ? setCurrentView('signup') : setCurrentView('login');
	}
	return (
		<div className = {`col-12 ${styles.LoginSignUp}`}>
			<header className={styles.header}>
				<img className={`col-4 ${styles.gears}`} src={gears} alt="moving gears" />
				<h1 className={`col ${styles.headerh1}`}>Agility</h1>
				<img className={`col-4 ${styles.gears1}`} src={gears} alt="moving gears" />
			</header>
			<main className={`col-12 ${styles.main}`}>
				<div className='col-lg-6 col-md-6 p-2'>
					<img className={`col-4 p-2 ${styles.image}`} src={agileBluert} alt="Being agile" />
					<div className={`col m-auto ${styles.agile}`} >
						<p className={`col p-4 `}>{message}</p>
					</div> 
				</div>
				{showSignIn ? 
				<div className='col-lg-6 col-md-6 p-2'>
					<div className={styles.view}>
						<Login changeView={handleViewChange} currentView={currentView}/>
					</div>
				</div> 
				: null}
			</main>
			<footer className={`col-12 p-2 mb-2 text-center ${styles.footer}`}>
				<i><span className={styles.worddef}>
					Agile  <span className={styles.sup}>(Adj.)</span>
				</span>
				<span className={`col p-4 ${styles.definition}`}>- a method of project management that is characterized by the division of tasks into short phases of work, frequent reassessment, and adaptation of plans.</span>
				</i>
			</footer>
		</div>
	)
}

export default LoginSignUp;
