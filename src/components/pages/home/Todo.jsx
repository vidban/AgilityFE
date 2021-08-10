import React from 'react'
import styles from "./Event.module.css";

const Todo = ({todo, remove, toggle}) => {

	const handleRemove = () => {
		remove(todo.id);
	}

	const handleTodoToggle = () => {
		toggle(todo.id);
	}

	return (
			<div className={`col-9 m-auto ${styles.todoitem}`}>
				<input
					className="col-lg-1 col-md-1 col-2"
					type="checkbox"
					checked={todo.completed}
					onChange={handleTodoToggle}
				/>
				<label
					className={`col-lg-10 col-md-10 col-8 p-2 ${todo.completed ? styles.label : null}` }
				>
					{todo.todo_name}
				</label>
				<button className={`col-lg-1 col-md-1 col-2 p-2 ${styles.remove}`} onClick={handleRemove}>X</button>
			</div>
	)
}

export default Todo;
