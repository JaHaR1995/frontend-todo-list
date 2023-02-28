import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTodos, fetchTodos, deleteTodos, addTodo } from "./todoSlice";

const Todos = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());  
  }, [dispatch]);

  return (
    <div className="container">
      <div className="header">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}      
          type="text"
          placeholder="Введите запрос"
        ></input>
        <button
          disabled={!text}
          onClick={() => dispatch(addTodo(text))}  
          className="btn"
        >
          {" "}
          Отправить{" "}
        </button>
      </div>
      {todos.map((todo) => {
        return (
          <div
            className={todo.completed ? "chekDel completed" : "chekDel"}           
            key={todo._id}
          >
            <input
              className="chekbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch(
                  completeTodos({ id: todo._id, completed: todo.completed })   
                )
              }
            />
            {todo.text}
            <span
              onClick={() => dispatch(deleteTodos(todo._id))}  
              className="btnDel"
            >
              ❌
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
