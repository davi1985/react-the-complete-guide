import { FormEvent, useContext, useRef } from "react";
import { TodosContext } from "../store/todosContext";

import classes from "./newTodo.module.css";

export const NewTodo = () => {
  const { addTodo } = useContext(TodosContext);
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const todoTextInput = (event: FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    addTodo(enteredText);

    todoTextInputRef.current!.value = "";
  };

  return (
    <form className={classes.form}>
      <label htmlFor="text">Todo Text</label>
      <input type="text" id="text" ref={todoTextInputRef} />

      <button type="submit" onClick={todoTextInput}>
        Add Todo
      </button>
    </form>
  );
};
