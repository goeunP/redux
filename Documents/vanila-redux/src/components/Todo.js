import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const DeleteBtn = styled.button`
  border: none;
  margin: 3px;
  background: none;
`;

const StyledLi = styled.li`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Todo({ text, id }) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(deleteTodo(id));
  };
  return (
    <StyledLi>
      <Link to={`/${id}`}>{text}</Link>{" "}
      <DeleteBtn onClick={onClick}>❌</DeleteBtn>
    </StyledLi>
  );
}

export default Todo;
