import { useContext } from "react";
import { TodosContext } from "../store/todosContext";
import { TodoItem } from "./TodoItem";

import classes from "./todos.module.css";

export const Todos = () => {
  const { items, removeTodo } = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          onRemoveTodo={removeTodo.bind(null, todo.id)}
        />
      ))}
    </ul>
  );
};
