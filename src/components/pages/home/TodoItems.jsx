import React from 'react';
import styles from "./Event.module.css";
import Alert from "../shared/Alert";


const TodoItems = ({todos,idx,handleShowTodos,newTodo,handleChange,handleKeyDown,todoView,handleChangeTodoView,numT,handleClearCompleted,error}) => {
	return (
		<div id={`todos${idx}`} className={`collapse ${styles.todos}`}  data-parent="#accordion" >
			<input
					type="search"
					className={`${styles.newtodo} m-2`}
					placeholder={`Add ${todos.length>0 ? 'another' : 'a'} task for this event...`}
					value={newTodo}
					onChange={handleChange}
					onKeyDown = {handleKeyDown}
					autoFocus
			/>
			{todos
			? handleShowTodos()
			: idx
			}
			<div className='col-lg-10 col-md-10 col d-flex flex-wrap justify-content-around m-auto' >
				<section className="col-8 d-flex justify-content-around">
					<span className={`p-2 mt-1 ${todoView ==='All' && styles.active} ${styles.taskfooter}`} onClick={handleChangeTodoView}>All</span>
					<span className={`p-2 mt-1 ${todoView ==='Active' && styles.active} ${styles.taskfooter}`} onClick={handleChangeTodoView}>Active</span>
					<span className={`p-2 mt-1 ${todoView ==='Completed' && styles.active} ${styles.taskfooter}`} onClick={handleChangeTodoView}>Completed</span>
				</section>
				{numT !== todos.length && <section className="col-4 m-auto">
				<span className={`p-2 mt-1 ${styles.taskfooter}`} onClick={handleClearCompleted}>Clear completed</span>
			</section>}
		</div>

		{error && <Alert message={error} className={`col-6 m-auto p-0 ${styles.alert}`}/>}
				
	</div>
	)
}

export default TodoItems
