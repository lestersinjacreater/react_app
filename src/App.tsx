import React, { useReducer, useEffect } from 'react';
import TodoInput from './componets/TodoInput';
import TodoList from './componets/TodoList';
import styles from './App.module.scss';
import { loadTodos, saveTodos } from './utils/localStorage';
import SunIcon from './assets/sun.svg';
import MoonIcon from './assets/moon.svg';
import { todoReducer, Filter, Theme, Todo } from './reducers/todoReducer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: loadTodos(),
    filter: 'all',
    theme: 'light',
  });

  const { todos, filter, theme } = state;

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={`${styles.app} ${theme === 'dark' ? styles.dark : ''}`}>
      <h1>TODO</h1>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} className={styles.toggleButton}>
        {theme === 'light' ? (
          <img src={MoonIcon} alt="Switch to Dark Mode" className={styles.icon} />
        ) : (
          <img src={SunIcon} alt="Switch to Light Mode" className={styles.icon} />
        )}
      </button>
      <TodoInput addTodo={(text: string) => dispatch({ type: 'ADD_TODO', payload: text })} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={(id: number) => dispatch({ type: 'TOGGLE_TODO', payload: id })}
        deleteTodo={(id: number) => dispatch({ type: 'DELETE_TODO', payload: id })}
      />
      <div className={styles.filters}>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
          className={filter === 'all' ? styles.active : ''}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
          className={filter === 'active' ? styles.active : ''}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
          className={filter === 'completed' ? styles.active : ''}
        >
          Completed
        </button>
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear Completed</button>
      </div>
    </div>
  );
};

export default App;


//standardize the code
