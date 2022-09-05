import classes from "./todoItem.module.css";

type TodoItemProps = {
  text: string;
  onRemoveTodo: () => void;
};

export const TodoItem = ({ text, onRemoveTodo }: TodoItemProps) => (
  <li className={classes.item} onClick={onRemoveTodo}>
    {text}
  </li>
);
