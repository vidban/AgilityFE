import React from 'react';
import MyPersonalCalendar from "../shared/MyPersonalCalendar";
import styles from "./Home.module.css";

const EventSelectionCalendar = ({closeModal, events}) => {
	return (
		<div className="modal col-lg-8 col-md-10 col-10" tabIndex="-1" role="dialog" style={{display: 'inline-block'}}>
		<div className={`modal-dialog ${styles.modaldialog}`} role="document">
			<div className="modal-content">
				<div className="modal-header">
					<div className={`${styles.textinfo} col-10 d-flex flex-column justify-content-center align-items-center`}>
						<p className="col mb-0">Drag to select a new time ...</p>
						<p className="col mb-0">Drag an existing event to move it to a different time ...</p>
					</div>
					<button type="button" className="btn btn-secondary col-lg-1 col-md-1 col-2" data-dismiss="modal" onClick={closeModal}>X</button>
				</div>
				<div className="modal-body">
					<MyPersonalCalendar  events={events} chosenView={'day'} myToolbar={false}/>
				</div>
			</div>
		</div>
	</div>
	)
}

export default EventSelectionCalendar
