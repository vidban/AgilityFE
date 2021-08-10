import React from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import moment from "moment";

const AddEventModal = ({day=null, show, setShow}) => {
	// const [event, setEvent] = useState({
	// 	type: "calendar-event",
	// 	title: "",
	// 	description: "",
	// 	date: "",
	// 	allday: false,
	// 	start: {
	// 	  date: null,
	// 	  time: { hours: null, minutes: null},
	// 	},
	// 	end: {
	// 	  date: null,
	// 	  time: { hours: null, minutes: null},
	// 	},
	//   });

	const handleShow = () => {
		setShow(false);
	}
	return (
		<Modal show={show} onHide={handleShow}>
		  <Modal.Header>
			<Modal.Title>New event for {moment(day).format('L')}</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
			  <Form>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="Event Title...." />
				</Form.Group>
				<Form.Group className="mb-3" controlId="ControlTextarea1">
				<Row className="g-2">
					<Col md>
						<Form.Label>Start Time</Form.Label>
						<Form.Control type="text" placeholder="name@example.com" />
						
					</Col>
					<Col md>
						<Form.Label>End Time</Form.Label>
						<Form.Control type="text" placeholder="name@example.com" />
					</Col>
				</Row>
				</Form.Group>
			  </Form>
		  </Modal.Body>
		  <Modal.Footer>
			<Button variant="secondary" onClick={handleShow}>
			  Close
			</Button>
			<Button variant="primary">
			  Add Event
			</Button>
		  </Modal.Footer>
		</Modal>
	)
}

export default AddEventModal;
