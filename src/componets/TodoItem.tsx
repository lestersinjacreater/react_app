import React from 'react';
import styles from './TodoItem.module.scss';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className={styles.checkbox}
      />
      <span
        className={todo.completed ? styles.completed : ''}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>Delete</button>
    </li>
  );
}

export default TodoItem;
