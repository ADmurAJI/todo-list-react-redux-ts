import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, updateTodosOrder } from '../features/todos/todosSlice';
import AddTodoForm from './AddTodoForm';
import FilterTodo from './FilterTodo';
import TodoItem from './TodoItem';
import { useDrop } from 'react-dnd';

const TodoList: React.FC = () => {
	// Получение списка задач из глобального состояния с использованием useSelector
	const todos = useSelector(selectTodos);
	
	const dispatch = useDispatch();
	
	// Использование react-dnd для поддержки перетаскивания
	const [, drop] = useDrop({
		// Определение типа элементов, которые могут быть перетаскиваемыми
		accept: 'TODO_ITEM',
		// Обработчик события при наведении на перетаскиваемый элемент
		hover(item: { id: number; index: number }) {
			// Получение индексов элементов до и после перемещения
			const dragIndex = item.index;
			const hoverIndex = todos.findIndex((todo) => todo.id === item.id);
			
			// Проверка на то, что элемент действительно перемещается
			if (dragIndex === hoverIndex) {
				return;
			}
			
			// Отправка экшена для обновления порядка задач
			dispatch(updateTodosOrder({ dragIndex, hoverIndex }));
		},
	});
	
	return (
		<div style={{ textAlign: 'center', margin: '20px' }}>
			<h1 style={{ color: '#333' }}>Список дел</h1>
			<AddTodoForm />
			<FilterTodo />
			{/* Обертка для поддержки перетаскивания */}
			<ul ref={drop} style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
				{todos.map((todo, index) => (
					<TodoItem key={todo.id} todo={todo} index={index} />
				))}
			</ul>
		</div>
	);
};

// Экспорт компонента TodoList
export default TodoList;
