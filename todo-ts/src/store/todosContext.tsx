import { createContext, ReactNode, useState } from "react";
import { Todo } from "../models/todo";

type TodoContextProps = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = createContext<TodoContextProps>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

export const TodosContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string): void => {
    const newTodo = new Todo(text);

    setTodos((prevState) => prevState.concat(newTodo));
  };

  const removeTodoHandler = (todoId: string): void =>
    setTodos((prevState) => prevState.filter(({ id }) => id !== todoId));

  const contextValue: TodoContextProps = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
