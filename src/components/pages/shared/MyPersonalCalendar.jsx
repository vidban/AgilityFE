import React, {useState, useContext, useEffect} from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "./MyPersonalCalendar.css";
import UserContext from '../../../context/UserContext';
import EventContext from '../../../context/EventContext';
import {colors} from './randomPastelColors';


const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyPersonalCalendar = ({ chosenView, myToolbar}) => {

	const {currentUser} = useContext(UserContext);
	const {events, addEvent, updateEvent, currentDate, handleSetCurrentDate, changeView} = useContext(EventContext);

	const [draggedEvent, setDraggedEvent]= useState(null);
	const [dView, setDView] = useState(chosenView);
	const [dDate, setDDate] = useState(undefined);

	useEffect(() => {
		setDDate(currentDate);
	},[currentDate])

	useEffect(() => {
		setDView(chosenView);
	}, [chosenView])
	
	const displayDragItemInCell = true;

	const handleDragStart = event => {
		setDraggedEvent(event);
	}
	
	const onDropFromOutside = ({ start, end, allDay }) => {
		const event = {
		  id: draggedEvent.id,
			userid:currentUser.id,
		  title: draggedEvent.title,
		  start,
		  end,
		  allDay: allDay,
		}
	
		setDraggedEvent(null);
		moveEvent({ event, start, end });
	}

	const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {

		let allDay = event.allDay
	
		if (!event.allDay && droppedOnAllDaySlot) {
			allDay = true
		} else if (event.allDay && !droppedOnAllDaySlot) {
			allDay = false
		}
	
		const nextEvents = events.map(existingEvent => {
			return existingEvent.id === event.id
			? { ...existingEvent, start, end, allDay }
			: existingEvent
		})
	
		updateEvent(nextEvents);

		// alert(`${event.title} was dropped onto ${updatedEvent.start}`)
	}

	const resizeEvent = ({ event, start, end }) => {

		const nextEvents = events.map(existingEvent => {
			return existingEvent.id === event.id
			? { ...existingEvent, start, end }
			: existingEvent
		})
	
		updateEvent(nextEvents);
	
		//alert(`${event.title} was resized to ${start}-${end}`)
	}

	const handleSelect = ({ start, end ,slots}) => {
		if (dView === 'month'){
			handleSetCurrentDate(start);
      changeView('day');
		}

		if (dView === 'day'){
			
			const title = window.prompt('New Event name')
			let hour = {
				userId:currentUser.id,
				title, 
				allDay: slots.length===1,
				start,
				end,
				color: "colors[Math.floor(Math.random()*colors.length)]"
			}
			if (title)
				addEvent(hour);
		}
			
	}		  

	const handleView = (view) => {
		changeView(view);
	}

	const handleNavigate=(date) => {
		handleSetCurrentDate(date);
	}

	const handleDrillDown = () => {
		return;
	}

	return (
		<div>
			<DragAndDropCalendar
				selectable
				localizer={localizer}
				events={events}
				onEventDrop={moveEvent}
				resizable
				defaultView = {dView}
				onEventResize={resizeEvent}
				view={dView}
				onView={handleView}
				date={dDate}
				views={['month','week','day']}
				step={15}
				timeslots={2}
				popup
				dragFromOutsideItem={displayDragItemInCell ? draggedEvent : null}
				onDropFromOutside={onDropFromOutside}
				handleDragStart={handleDragStart}
				onSelectSlot={handleSelect}
				onSelectEvent={(e)=> alert(e.title)}
				onNavigate={handleNavigate}
				toolbar={myToolbar}
			/>
		</div>
	)
}

export default MyPersonalCalendar;
