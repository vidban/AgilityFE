import React, {useState, useEffect}  from 'react';
import Event from "../home/Event";
import moment from "moment";

const WeeklyEvents = ({events}) => {

	const [monthlyEvents, setMonthlyEvents] = useState(null);

	
	useEffect(() => {
		let eventsByMonth={};

		const rearrangeEvents = () => {
			events.forEach((e)=> {
				const dt = e.start.toDateString();
				eventsByMonth[dt]
				? eventsByMonth[dt] = [...eventsByMonth[dt], e]
				: eventsByMonth[dt] = [e];
			})
			setMonthlyEvents(eventsByMonth);
		}
	
		rearrangeEvents();
	},[events]);

	const formatMonthlyDayForEvent = (key) => {
		let day = moment(new Date(key)).format('ddd');
		let date = new Date(key).getDate();
		return {day,date};
	}
	return (
		<div>
			{	monthlyEvents 
				? Object.keys(monthlyEvents).map((key,iidx) => {
					let {day,date} = formatMonthlyDayForEvent(key);
					return (
						<div key={iidx} className="d-flex p-1 mb-1 justify-content-center align-items-start border border-secondary">
							<div className='d-flex flex-column col-2'><h6>{day}</h6><h6>{date}</h6></div>
							<div className="col-10 d-flex flex-column">
								{monthlyEvents[key].map((evt, eidx) => <div key={eidx}><Event item={evt} idx={eidx}/></div>
							)}
							</div>
							
						</div>
					)}
				)
				: <h2>Nothing scheduled for this month...</h2>
			}
		</div>
	)
}

export default WeeklyEvents
