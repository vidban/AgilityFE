import React, {useContext} from 'react';
import styles from "./MyCalendar.module.css";
import MyPersonalCalendar from "../shared/MyPersonalCalendar";
import EventContext from "../../../context/EventContext";
import MonthlyEvents from './MonthlyEvents';
import WeeklyEvents from "./WeeklyEvents";
import Event from "../home/Event";

const MyCalendar = () => {

	const {events, currentView} = useContext(EventContext);
	
	const updateEvent = () => {
		console.log('updating event');
	}

	const addEvent = () => {
		console.log('adding event');
	}

	const showEventsByView = () => {
			if (currentView === 'month'){
				return (<>
					<h6>Monthly Events</h6>
					<MonthlyEvents events={events}/>
				</>)
			} else if (currentView === 'day'){
				return (
					<>
					<h6>Daily Events</h6>
					{events.length 
						? events.map((item, idx) => 
							<div key={idx} ><Event item={item} idx={idx} /></div>
						)
					: 'Nothing scheduled for today...'}
					</>
				)
			} else if (currentView === 'week'){
				return (<>
					<h6>Weekly Events</h6>
					<WeeklyEvents events={events}/>
				</>)
			}
	}

	return (
		<div className={`col d-flex justify-content-center ${styles.Calendar}`}>
			<section className={`col-6 ${styles.calendar}`}>
				<MyPersonalCalendar chosenView={currentView} events={events} updateEvent={updateEvent} addEvent={addEvent} myToolbar={true}/>
			</section>
			<section className={`col-6 ${styles.dayevents}`}>
				<div className="pt-4 col-11">
					{showEventsByView()}
				</div>
			</section>
		</div>
	  );
}

export default MyCalendar;
