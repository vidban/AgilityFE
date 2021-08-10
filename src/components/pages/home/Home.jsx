import React, {useContext, useState, useEffect} from 'react';
import EventSelectionCalendar from "./EventSelectionCalendar";
import AgilityApi from '../../../AgilityApi';
import Event from "./Event";
import EventContext from '../../../context/EventContext';
import styles from "./Home.module.css";
import moment from 'moment';


const Home = () => {

	const {events,handleSetCurrentDate, removeEvent, changeView} = useContext(EventContext);

	const [weather,setWeather] = useState({text:null, icon:null, temp:null})
	const [showCalendarModal, setShowCalendarModal] = useState(false);

	useEffect (() => {
		const getLocation = async () => {
					
			await navigator.geolocation.getCurrentPosition(async (position) => {
				let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
		
        try {
          const {current} = await AgilityApi.getWeather(latitude,longitude);
				  setWeather({text: current.condition.text, icon: current.condition.icon, temp: current.temp_f});
        } catch (error) {
          console.log(error);
        }
				
	
			});
		}
		getLocation();
		handleSetCurrentDate(new Date());
		
	}, []);

	useEffect(()=> {
		changeView('day')
	},[changeView])
	
	
	const getWelcomeMessage = () => {
		let message;
		const timeNow  = new Date().getHours();
		if (timeNow>16){
			message="Good Evening!";
		}else if (timeNow>12){
			message = "Good Afternoon!";
		}else{
			message="Good Morning!";
		}
		return message;
	}

	const handleShowCalendar = () => {
		setShowCalendarModal(true);
	}

	const handleCloseCalendarModal = () => {
		setShowCalendarModal(false);
	}

	const handleRemoveEvent = async(id) => {
		try{
			await AgilityApi.removeEvent(id);
			removeEvent(id);
		} catch (err){
			console.log(err);
		}
	}


	return (
		<div className={`${styles.Home} col-10 m-auto p-4`}>
			<header className="d-flex justify-content-around align-items-center">
				<section className={`col-4 pl-4 pr-4 d-flex flex-column justify-content-center align-items-center ${styles.date}`}>
					<p className="mb-0">{moment(new Date()).format('dddd')}</p>
					<p className="mb-0">{moment(new Date()).format('ll')}</p>
				</section>
				<h1>{getWelcomeMessage()}</h1>
				{weather.text && (
					<section className={`col-4 pl-4 pr-4 d-flex flex-column justify-content-center align-items-center ${styles.weather}`} style={weather.text === 'Sunny' ? {backgroundColor:'#fffe88', color: 'black'} : {backgroundColor:'grey', color:'#fff'}}>
						<p className="mb-0">{weather.temp}&#176;F</p>
						<img src={weather.icon} alt="weathericon" />
						<p className={`mb-0 ${styles.wtext}`}> {weather.text}</p>
					</section>
				)}

			</header>
			
			<main className="d-flex flex-wrap justify-content-center mt-4">
				<section className={`col-lg-8 col-12 p-4 pb-0 ${styles.events}`}>
					<section onClick={handleShowCalendar} className={`m-auto d-flex justify-content-center align-items-center ${styles.addevent}`} data-toggle="tooltip" data-placement="auto" title="Add events">
						<span>+</span>
					</section>
					<ul id="accordion" className="p-0">
						<h2 className="mb-4">{events.length ? "Today's Events" : "Nothing scheduled for today..."}</h2>
						{events.map((item, idx) => {
							return <li key={idx} ><Event item={item} idx={idx} removeEvent={handleRemoveEvent}/></li>
						})}
					</ul>
				</section>
				
			</main>
			{showCalendarModal && <EventSelectionCalendar closeModal={handleCloseCalendarModal} events={events}/>}
		</div>
	)
}

export default Home;
