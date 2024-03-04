import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { TodoService } from './TodoService';

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

interface TodosState {
	list: Todo[];
}

const initialState: TodosState = {
	list: TodoService.getTodosFromLocalStorage(),
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		// Добавление нового дела
		addTodo: (state, action: PayloadAction<string>) => {
			const newTodo: Todo = {
				id: Date.now(),
				text: action.payload,
				completed: false,
			};
			state.list.push(newTodo);
			TodoService.saveTodosToLocalStorage(state.list);
		},
		
		// Переключение статуса выполнения дела
		toggleTodo: (state, action: PayloadAction<number>) => {
			const todo = state.list.find((t) => t.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
				TodoService.saveTodosToLocalStorage(state.list);
			}
		},
		
		// Удаление дела
		removeTodo: (state, action: PayloadAction<number>) => {
			state.list = state.list.filter((todo) => todo.id !== action.payload);
			TodoService.saveTodosToLocalStorage(state.list);
		},
		
		// Редактирование текста дела
		editTodo: (state, action: PayloadAction<{ id: number; newText: string }>) => {
			const todo = state.list.find((t) => t.id === action.payload.id);
			if (todo) {
				todo.text = action.payload.newText;
				TodoService.saveTodosToLocalStorage(state.list);
			}
		},
		
		// Фильтрация выполненных дел
		filterCompleted: (state) => {
			const originalList = TodoService.getTodosFromLocalStorage();
			state.list = originalList.filter((todo) => todo.completed);
		},
		
		// Фильтрация невыполненных дел
		filterNotCompleted: (state) => {
			const originalList = TodoService.getTodosFromLocalStorage();
			state.list = originalList.filter((todo) => !todo.completed);
		},
		
		// Отмена фильтрации и отображение всех дел
		noFilter: (state) => {
			state.list = TodoService.getTodosFromLocalStorage();
		},
		
		// Обновление порядка дел при перетаскивании
		updateTodosOrder: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
			const { dragIndex, hoverIndex } = action.payload;
			const newTodos = [...state.list];
			const [draggedItem] = newTodos.splice(dragIndex, 1);
			newTodos.splice(hoverIndex, 0, draggedItem);
			state.list = newTodos;
			TodoService.saveTodosToLocalStorage(newTodos);
		},
	},
});

// Экспортируем экшены
export const {
	addTodo,
	toggleTodo,
	removeTodo,
	editTodo,
	filterCompleted,
	filterNotCompleted,
	noFilter,
	updateTodosOrder,
} = todosSlice.actions;

// Селектор для получения списка дел из состояния
export const selectTodos = (state: RootState) => state.todos.list;

export default todosSlice.reducer;