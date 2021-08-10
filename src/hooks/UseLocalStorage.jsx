import {useState, useEffect} from 'react'

const UseLocalStorage = (key, firstValue = null) => {
	const initialValue = localStorage.getItem(key) || firstValue;
	const [item,setItem] = useState(initialValue);

	useEffect(() => {
		!item 
		? localStorage.removeItem(key)
		: localStorage.setItem(key, item);
	}, [key,item]);

	return [item,setItem];

}

export default UseLocalStorage
