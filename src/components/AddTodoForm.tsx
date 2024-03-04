import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';

const AddTodoForm: React.FC = () => {
	const dispatch = useDispatch();
	const [newTodo, setNewTodo] = useState('');
	
	// Обработчик добавления нового дела
	const handleAddTodo = () => {
		// Проверяем, чтобы не добавить пустое дело
		if (newTodo.trim() !== '') {
			// Диспатчим действие для добавления нового дела в хранилище
			dispatch(addTodo(newTodo.trim()));
			// Очищаем поле ввода после добавления
			setNewTodo('');
		}
	};
	
	return (
		<div style={{ margin: '20px' }}>
			<input
				type="text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				style={{ marginRight: '10px' }}
			/>
			<button onClick={handleAddTodo}>Добавить событие</button>
		</div>
	);
};

export default AddTodoForm;
