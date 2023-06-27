import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store";
import Todo from "../components/Todo";

function Home() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };

  // useSelector : store에서 state 가져오기
  const toDo = useSelector((state) => state);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText("");
  };
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}></input>
        <button>Add</button>
      </form>
      <ul>
        {toDo.map((toDo) => (
          <Todo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// redux store에서 state 가져오는 방법

// useSelector가 대체함
// function mapStateToProps(state, ownProps) {
//   return { toDos: state };
// }

// useDispatch가 대체함
// function mapDispatchToProps(dispatch, ownProps) {
//   return { addToDo: (text) => dispatch(actionCreators.addToDo(text)) };
// }

export default Home;
