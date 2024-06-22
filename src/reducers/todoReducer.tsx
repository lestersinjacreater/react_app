export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = 'all' | 'active' | 'completed';
export type Theme = 'light' | 'dark';

type State = {
  todos: Todo[];
  filter: Filter;
  theme: Theme;
};

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_TODOS'; payload: Todo[] };

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = { id: Date.now(), text: action.payload, completed: false };
      return { ...state, todos: [...state.todos, newTodo] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(todo => !todo.completed) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};
