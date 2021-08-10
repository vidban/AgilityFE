import React, {useState} from 'react';
import AddEventModal  from '../AddEventModal';
import styles from "./MyCalendar.module.css";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';



const MyCalendar = () => {

	const [selectedDay, setSelectedDay] = useState(new Date());
	const [showAddEventForm, setShowAddEventForm] = useState(false);
	const [events, setEvents] = useState({});

	const handleDayClick = (day) => {
		setSelectedDay(day);
	}

	const handleAddEventClick = () => {
		setShowAddEventForm(true);
	}
	return (
		<div className={`col d-flex justify-content-center align-items-center ${styles.Calendar}`}>
			<div className={`col-8 ${styles.calendar}`}>
				<DayPicker
					onDayClick={handleDayClick}
					className={styles.DayPicker}
					showOutsideDays
				/>
			</div>
			<div className={`col-4 p-2 ${styles.dayevents}`}>
				<button 
					className={`btn p-2 ${styles.addevents}`}
					onClick={handleAddEventClick}>
					+ Add Event
				</button>
				<h2>Events</h2>
				<p>{Object.keys(events).length ? 'Loading...' : `No events scheduled for ${selectedDay.toLocaleDateString()}`}</p>
			</div>
			{showAddEventForm 
				? <AddEventModal 
					show={showAddEventForm} 
					setShow={setShowAddEventForm} 
					add={setEvents}
					date={selectedDay}
				/> 
				: null}
		
		</div>
		
	  );
}

export default MyCalendar;
