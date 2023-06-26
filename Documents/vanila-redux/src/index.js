// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import App from "./App";
// // import reportWebVitals from "./reportWebVitals";

// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// import { createStore } from "redux";

// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const num = document.querySelector("span");

// //reducer는 data(state) 변경하고 관리하는 function    ex) +- 관리
// //reducer 이름이 countModifier
// //redux에서는 data modifier가 한 reducer함수에서만 일어나야함
// //return하는 값이 application의 state가 됨

// const countModifier = (count = 0, action) => {
//   //state 변경 부분
//   console.log(action, count);
//   //   if (action.type === "ADD") {
//   //     return count + 1;
//   //   } else if (action.type === "MINUS") {
//   //     return count - 1;
//   //   } else {
//   //     return count;
//   //   }
//   switch (action.type) {
//     case "ADD":
//       return count + 1;
//     case "MINUS":
//       return count - 1;
//     default:
//       return count;
//   }
// };

// //createStore로 data 저장소 만들기 -> data 변경시키는 함수 넣어주기
// const countStore = createStore(countModifier);

// //subscribe : store 내부에 들어있는 data 변화 감지 -> 구독해서 변화 감지 하는 방식
// const onChange = () => {
//   num.innerText = countStore.getState();
// };
// countStore.subscribe(onChange);

// //store.dispatch(action)하면 redux가 countModifier 불러서 action 전달
// add.addEventListener("click", () => countStore.dispatch({ type: "ADD" }));
// minus.addEventListener("click", () => countStore.dispatch({ type: "MINUS" }));

// console.log(countStore.getState());

//Todo list

import { createStore } from "redux";
const add_todo = "add_todo";
const delete_todo = "delete_todo";

const addTodo = (text) => {
  return {
    type: add_todo,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: delete_todo,
    id,
  };
};
const reducer = (state = [], action) => {
  console.log(action, state);
  switch (action.type) {
    case add_todo:
      return [{ text: action.text, id: Date.now() }, ...state];
    case delete_todo:
      return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};
const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo);
};
const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "delete";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintTodos);
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", onSubmit);
