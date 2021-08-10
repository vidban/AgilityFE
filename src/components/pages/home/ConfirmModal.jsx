import React from 'react';
import styles from "./Event.module.css";

const ConfirmModal = ({remove}) => {

	const handleResponse = (e) => {
		console.log(e.target.dataset.value);
		remove(e.target.dataset.value);
	}
	return (
		<div className={`modal ${styles.confirmmodal}`} tabIndex="-1" role="dialog" style={{display: 'block'}}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-body">
						<p>Are you sure you want to remove this item?</p>
					</div>
					<div className="modal-footer">
						<button type="button" data-value={1} className="btn btn-primary" data-dismiss="modal" onClick={handleResponse}>Yes</button>
						<button type="button" data-value={2} className="btn btn-secondary" data-dismiss="modal" onClick={handleResponse}>No</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
