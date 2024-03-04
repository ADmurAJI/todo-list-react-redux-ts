import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

// Создаем Redux store с помощью configureStore
export const store = configureStore({
	reducer: {
		todos: todosReducer, // Подключаем редьюсер для управления состоянием списка дел
	},
});

// Определяем тип корневого состояния приложения
export type RootState = ReturnType<typeof store.getState>;

// Определяем тип для диспетчера, связанного с Redux store
export type AppDispatch = typeof store.dispatch;
