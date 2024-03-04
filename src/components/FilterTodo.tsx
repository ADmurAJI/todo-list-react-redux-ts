import React from 'react';
import { useDispatch } from 'react-redux';
import { filterCompleted, filterNotCompleted, noFilter } from '../features/todos/todosSlice';

const FilterTodo: React.FC = () => {
	const dispatch = useDispatch();
	
	// Обработчик для фильтрации выполненных дел
	const handleFilterCompleted = () => {
		dispatch(filterCompleted());
	};
	
	// Обработчик для фильтрации невыполненных дел
	const handleFilterNotCompleted = () => {
		dispatch(filterNotCompleted());
	};
	
	// Обработчик для отмены фильтрации и отображения всех дел
	const handleSortByDate = () => {
		dispatch(noFilter());
	};
	
	return (
		<div style={{ margin: '20px' }}>
			<button onClick={handleFilterCompleted} style={{ marginRight: '5px' }}>
				Только выполненные
			</button>
			<button onClick={handleFilterNotCompleted} style={{ marginRight: '5px' }}>
				Только не выполненные
			</button>
			<button onClick={handleSortByDate}>Показать все</button>
		</div>
	);
};

export default FilterTodo;
