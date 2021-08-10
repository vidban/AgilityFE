import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import AgilityApi from "../../AgilityApi";
import Alert from "../pages/shared/Alert";
import UserContext from "../../context/UserContext";
import styles from "./Login.module.css";

const Login = ({changeView, currentView}) => {
	const history = useHistory();
	const { setToken } = useContext(UserContext);

	const [userInfo, setUserInfo] = useState({
		username: "",
		password: "",
		first_name: "",
		last_name: "",
		email: "",
		error: "",
		success: ""
	  });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserInfo((u) => ({ ...u, [name]: value }));
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data;
		let endpoint;
		let token;

		const { username, password, first_name, last_name, email } = userInfo;

		if (currentView === "signup") {
		data = {
			username,
			password,
			first_name,
			last_name,
			email,
		};
		endpoint = "register";
		} else {
		data = {
			username,
			password,
		};
		endpoint = "login";
		}

		try {
			token = await AgilityApi[endpoint](data);
			if (endpoint === 'login' ){
				setToken(token);
				history.push('/');
			}else{
				setUserInfo((u) => ({...u, success: 'Signin Successful. Please log in to continue...'}));
				setTimeout(() => {
					history.push('/');
				},2000)
			}
		} catch ({error}) {
			return setUserInfo((u) => ({ ...u, error: error.message }));
		}
		
	}

	const showAlert = () => {
		setTimeout(() => {
			setUserInfo((u) => ({...u, error: ""}));
		},3000);
		return; 
	}
	return (
		<div className='Login col-lg-8 col-md-10 col m-auto'>
			<div className='d-flex'>
			<div className='btn-group col'>
				<button
				className={`btn btn-outline-info col  ${
					currentView === "login" ? styles.active : styles.login
				}`}
				onClick={changeView}
				>
				Login
				</button>
				<button
				className={`btn btn-outline-info col  ${
					currentView === "login" ? styles.signup : styles.active
				}`}
				onClick={changeView}
				>
				Sign up
				</button>
			</div>
			</div>
			<div className={`card p-2 ${styles.card}`}>
				<Alert type={userInfo.success ? 'success': null} message={userInfo.success} />
				<Alert type={userInfo.error ? 'danger' : null} message={userInfo.error} />
				{userInfo.error && showAlert()}
				<div className='card-body pt-2'>
					<form onSubmit={handleSubmit}>
					<div className={`form-group mb-4 ${styles.formgroup}`}>
						<label htmlFor='username'>Username</label>
						<input
						type='text'
						name='username'
						className='form-control'
						value={userInfo.username}
						onChange={handleChange}
						/>
					</div>
					<div className={`form-group mb-4 ${styles.formgroup}`}>
						<label htmlFor='password'>Password</label>
						<input
						type='password'
						name='password'
						className='form-control'
						value={userInfo.password}
						onChange={handleChange}
						/>
					</div>
					{currentView === "login" ? (
						""
					) : (
						<div>
						<div className={`form-group mb-4 ${styles.formgroup}`}>
							<label>First name</label>
							<input
							type='text'
							name='first_name'
							className='form-control'
							value={userInfo.first_name}
							onChange={handleChange}
							/>
						</div>
						<div className={`form-group mb-4 ${styles.formgroup}`}>
							<label>Last name</label>
							<input
							type='text'
							name='last_name'
							className='form-control'
							value={userInfo.last_name}
							onChange={handleChange}
							/>
						</div>
						<div className={`form-group mb-4 ${styles.formgroup}`}>
							<label>Email</label>
							<input
							type='email'
							name='email'
							className='form-control'
							value={userInfo.email}
							onChange={handleChange}
							/>
						</div>
						</div>
					)}
					
					<button
						type='submit'
						className={`col-lg-4 col-md-4 col btn ${styles.submit}`}
						onSubmit={handleSubmit}
					>
						Submit
					</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
