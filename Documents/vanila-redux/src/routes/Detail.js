import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../store";

function Detail() {
  const id = parseInt(useParams().id);
  const navigate = useNavigate();
  const toDo = useSelector((state) => state);
  const toDoDetail = toDo.find((toDo) => toDo.id === id);
  const date = Date(toDoDetail?.id);
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteTodo(id));
    navigate("/");
  };
  return (
    <>
      <h1>{toDoDetail?.text}</h1>
      <h5>Created at: {date}</h5>
      <button onClick={onDelete}>delete</button>
    </>
  );
}

export default Detail;
