import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addTodo = (text) => {
  return { type: ADD, text };
};

export const deleteTodo = (id) => {
  return { type: DELETE, id };
};

// JSON.stringify => js 값이나 객체를 JSON 문자열로 변환
// JSON.parse => JSON 문자열은 js 객체로 변환
//localStorage.setItem("todos", JSON.stringify([]));

const reducer = (state = JSON.parse(localStorage.getItem("todos")), action) => {
  switch (action.type) {
    case ADD:
      const newToDo = { text: action.text, id: Date.now() };
      localStorage.setItem("todos", JSON.stringify([newToDo, ...state]));
      return JSON.parse(localStorage.getItem("todos"));
    case DELETE:
      const delToDo = state.filter((toDo) => toDo.id !== action.id);
      localStorage.setItem("todos", JSON.stringify(delToDo));
      return JSON.parse(localStorage.getItem("todos"));
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
