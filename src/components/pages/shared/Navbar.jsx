import React, {useContext} from 'react'
import { Link, NavLink} from "react-router-dom";
import UserContext from "../../../context/UserContext";
import logo from "../../../images/agileLogo1.png";
import "./Navbar.css";


const Navbar = () => {
	const { currentUser, handleLogOut} = useContext(UserContext);

	const loggedIn = () => (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<NavLink className='nav-link' to='/Home'>Home</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className='nav-link' to='/calendar'>My Calendar</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className='nav-link' to='/profile'>Profile</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className='nav-link' exact to='/' onClick={handleLogOut}>Logout</NavLink>
			</li>
		</ul>
	);

	return (
		<>
		{currentUser ?
			(<nav className='navbar navbar-expand-md navbar-dark bg-dark p-2 d-flex justify-content-between'>
			<Link className='navbar-brand d-flex justify-content-center align-items-end' to='/' >
				<u>Agility</u> 
				<img src={logo} alt="logo"/>
			</Link>
			{loggedIn()}
		</nav>)
		: (null)
		}
		</>
	)
}

export default Navbar
