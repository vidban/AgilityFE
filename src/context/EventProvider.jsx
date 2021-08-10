import React, { useContext, useState, useEffect } from "react";
import EventContext from "./EventContext";
import AgilityApi from "../AgilityApi";
import UserContext from "../context/UserContext";

const EventProvider = ({ children }) => {

	const {currentUser} = useContext(UserContext);

	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentView, setCurrentView] = useState('day');
  const [modifyEvent, setModifyEvent] = useState('false');

	const sortDayEvents = (events => {
		events.sort((a,b) => a.start.getHours()-b.start.getHours());
	})

	const sortEvents = (events) => {
		events.sort((a,b) => a.start-b.start);
	}

	useEffect(() => {
		let events; 
		const dateInFocus = currentDate.getDate();
		const monthInFocus = currentDate.getMonth()+1;

		const weekRange = () => {
		let weekStart, weekEnd;
		weekStart = new Date(currentDate);
		weekStart.setDate(weekStart.getDate()-weekStart.getDay());
		weekEnd = new Date(currentDate);
		weekEnd.setDate(weekStart.getDate()+7);
		return {weekStart, weekEnd};
	}
	

		const data = async () => {
			try {
				if (currentView === 'day'){
					events = await AgilityApi.getDaysEvents(currentUser.id, dateInFocus);
				}else if (currentView === 'month'){
					events = await AgilityApi.getMonthsEvents(currentUser.id, monthInFocus);
				}else if (currentView === 'week'){
					const {weekStart, weekEnd} = weekRange();
					events = await AgilityApi.getWeeksEvents(currentUser.id, {weekStart, weekEnd});
				}

					events.forEach(e => {
						e.start = new Date(e.start);
						e.end = new Date(e.end);
					})

					if (currentView === 'day'){
						sortDayEvents(events)
					}else{
						sortEvents(events);
					}
					
					setEvents(events);
          setModifyEvent(false);
			} catch (error) {
					// console.log(error);
			}
		};
		data();
	},[currentUser, currentDate, setEvents, currentView, modifyEvent])

	const addEvent = async (newEvent) => {
		try {
			let result = await AgilityApi.addNewEvent(currentUser.id, newEvent);
			result.start = new Date(result.start);
			result.end = new Date(result.end);
			if (result.start.getDate() === currentDate.getDate()){
				let copyOfEvents = [...events];
				copyOfEvents = [...events, result];
				sortEvents(copyOfEvents);
				setEvents(copyOfEvents);
			};
			
		} catch (error) {
			console.log(error);
		}
	}

	const updateEvent = async (event) => {
		// sortEvents(events);
		// setEvents(events);
    await AgilityApi.updateEvent(currentUser.id,event);
    setModifyEvent('true');

	}

	const removeEvent =async(id) => {
		let filteredEvents = events.filter((e) => e.id !== id);
		setEvents(filteredEvents);
	}

	const handleSetCurrentDate = (date) => {
		setCurrentDate(date);
	}

	const changeView = (view) => {
		setCurrentView(view);
	}

	return (
		<EventContext.Provider
			value={{ events, addEvent, currentView, changeView , updateEvent, removeEvent, currentDate, handleSetCurrentDate }}
		>
			{children}
		</EventContext.Provider>
	);

};

export default EventProvider;