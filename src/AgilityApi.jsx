import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TOKEN_STORAGE_ID = process.env.REACT_APP_TOKEN_STORAGE_ID;
const UNSPLASH_URL = process.env.REACT_APP_UNSPLASH_URL;
const WEATHERAPI_URL = process.env.REACT_APP_WEATHERAPI_URL;

class AgilityApi {
  static async request(endpoint, params = {}, verb = "get") {
    let _token = localStorage.getItem(TOKEN_STORAGE_ID);

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params },
      });
    } else if (verb === "post") {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "delete") {
      q = axios.delete(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params },
      });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data;
      throw message;
    }
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async register(data) {
    let res = await this.request("users", data, "post");
    return res.token;
  }

  static async login(data) {
    let res = await this.request("login", data, "post");
    return res.token;
  }

	static async getDaysEvents(userId,currDate) {
		let {events} = await this.request(`events/${userId}/day/${currDate}`);
		return events;
	}

	static async getMonthsEvents(userId,currMonth) {
		let {events} = await this.request(`events/${userId}/month/${currMonth}`);
		return events;
	}

	static async getWeeksEvents(userId,weekRange) {
		let {weekStart,weekEnd} = weekRange;
		let {events} = await this.request(`events/${userId}/week/${weekStart}/${weekEnd}`);
		return events;
	}

	static async addNewEvent(userId, data){
		let {event} = await this.request(`events/${userId}/add`, data, 'post');
		return event;
	}

  static async updateEvent(userId, data){
		let {event} = await this.request(`events/${userId}/update`, data, 'patch');
		return event;
	}

	static async removeEvent(eventId){
		let res = await this.request(`events/${eventId}/remove`, {} , 'delete');
		return res.message;
	}

	static async getTodos(eventId) {
		let {todos} = await this.request(`todos/${eventId}`);
		return todos;
	}

	static async addTodoItem(eventId,newTodo) {
		let {todo} = await this.request("todos/addItem", {eventId,newTodo}, "post");
		return todo;
	}

	static async removeTodo(id) {
		const {message} = await this.request(`todos/${id}`,{},"delete");
		return message;
	}

	static async updateTodo(id) {
		const {message} = await this.request(`todos/${id}`,{},"patch");
		return message;
	}

	static async clearTodos(eventId){
		const {todos} = await this.request(`todos/clear/${eventId}`, {}, "delete");
		return todos;
	}

  static async getHomeImage() {
    const {data} = await axios.get(`${UNSPLASH_URL}&&query=mountain%20landscape%20nature`);
    const randomNum = Math.floor(Math.random()*data.results.length);
    return data.results[randomNum];
  }

	static async getWeather(lat,lon) {
		const {data} = await axios.get(`${WEATHERAPI_URL}${lat},${lon}`);
		return data;
	}
}

export default AgilityApi;
