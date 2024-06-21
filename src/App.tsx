import React, { useState, useEffect } from 'react';
import TodoInput from './componets/TodoInput';
import TodoList from './componets/TodoList';
import styles from './App.module.scss';
import { loadTodos, saveTodos } from './utils/localStorage';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos());
  const [filter, setFilter] = useState<Filter>('all');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${styles.app} ${theme === 'dark' ? styles.dark : ''}`}>
      <h1>TODO</h1>
      <button onClick={toggleTheme} className={styles.toggleButton}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <div className={styles.filters}>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? styles.active : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.active : ''}>Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default App;
