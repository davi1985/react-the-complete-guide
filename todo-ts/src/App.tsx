import { NewTodo } from "./components/NewTodo";
import { Todos } from "./components/Todos";
import { TodosContextProvider } from "./store/todosContext";

export const App = () => {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
};
