import React, {useState, useEffect} from 'react';
import Todo from "./Todo";
import TodoItems from "./TodoItems";
import AgilityApi from '../../../AgilityApi';
import styles from "./Event.module.css";
import ConfirmModal from "./ConfirmModal";
import moment from 'moment';



const Event = ({item, idx, removeEvent}) => {


	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [error, setError] = useState(null);
	const [todoView, setTodoView] = useState('All');
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	let numT;
	useEffect(() => {
		const getTodos = async() => {
      try {
        let todos = await AgilityApi.getTodos(item.id);
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
		
		}
		getTodos();
	}, [item])

	const handleSubmit = async (e) => {
		try {
			let response = await AgilityApi.addTodoItem(item.id, newTodo);
			setTodos(() => [...todos, response]);
			setNewTodo('');
		} catch ({error}) {
			setError(error.message);
			setTimeout(()=> {
				setError(null);
			},2000);
		}
	}

	const handleKeyDown = (e) => {
		if (e.which === 13) {
			handleSubmit();
		}else{
			return;
		}
	}

	const handleChange = (e) => {
			setNewTodo(e.target.value);
	}

	const handleRemoveTodo =  async (id)=> {
		try {
			await AgilityApi.removeTodo(id);
			setTodos((todos) => todos.filter((t) => t.id !== id));
		} catch (error) {
			console.log(error);
		}
	}

	const getNumTasks = () => {
		
		numT = todos.filter(t=> !t.completed).length;

		let message = `${numT} task${numT === 1 ? '' : 's'}`
		return message;
	}

	const handleTodoToggle = async (id) => {
    try {
      await AgilityApi.updateTodo(id);
		  setTodos((todos) => todos.map(
			(t) => t.id === id ? {...t, completed: !t.completed} : t));
    } catch (error) {
      console.log(error);
    }
		
	}

	const handleChangeTodoView = (e) => {
		let view = e.target.innerText;
		setTodoView(view);
	}

	const handleShowTodos = () => {
		let showTodos = todos.filter((todo) => {
			switch (todoView){
				case ('Completed'):
					return todo.completed;
				case ('Active'):
					return !todo.completed;
				default :
					return todo;
			}
		})

		return showTodos.map((todo,idx) => (
			<div key={idx}>
				<Todo todo={todo} remove={handleRemoveTodo} toggle={handleTodoToggle}/>
				<hr className="col-10 m-auto"/>
			</div>
	))
	}

	const handleClearCompleted = async () => {
    try {
      let todos = await AgilityApi.clearTodos(item.id);
		  setTodos(todos);
    } catch (error) {
      console.log(error);
    }
		
	}


	const handleRemoveEvent = async(res) => {
		setShowConfirmModal(!showConfirmModal);
		if (parseInt(res) === 2) return;
		removeEvent(item.id);
	}

	return (
		<div className="event m-1" style={{backgroundColor: item.color, borderRadius: '10px'}}>
			<div className="d-flex col-12 justify-content-center align-items-center">
				<button className={`btn col-10 d-flex flex-wrap  align-items-center ${styles.eventtogglebutton}`} data-toggle='collapse' data-target={`#todos${idx}`} aria-expanded="true" aria-controls={`todos${idx}`}> 
					<span className={`col-4 mb-0 ${styles.eventtime}`}>{item.allday ? 'All Day' : `${moment(item.start).format('LT')} - ${moment(item.end).format('LT')}`}</span>
					<span className={`col-6 mb-0 ${styles.eventtitle}`}><strong>{item.title}</strong></span>
					<span className="col-2 mb-0">{getNumTasks()}</span>
				</button>
				<span className={`${styles.icons} col-1 mb-0 d-flex justify-content-around`}>
					<span data-toggle="tooltip" data-placement="auto" title="Remove Event" onClick={() => setShowConfirmModal(!showConfirmModal)}>
						<svg className={styles.remove} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" data-toggle="tooltip" data-placement="top" title="Remove Event"><path fillRule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>
					</span>
				</span>
			</div>
			<TodoItems 
				todos = {todos}
				idx={idx}
				handleShowTodos= {handleShowTodos}
				newTodo={newTodo}
				handleChange={handleChange}
				handleKeyDown={handleKeyDown}
				todoView={todoView}
				handleChangeTodoView={handleChangeTodoView}
				numT={numT}
				handleClearCompleted={handleClearCompleted}
				error={error}
			/>
			{showConfirmModal && <ConfirmModal remove={handleRemoveEvent} />}

		</div>
	)
}

export default Event;
