import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../features/todos/TodoService';
import { toggleTodo, removeTodo, editTodo, updateTodosOrder } from '../features/todos/todosSlice'
import { useDrag, useDrop } from 'react-dnd';

interface DragItem {
	id: number;
	index: number;
}

// Интерфейс для пропсов TodoItem компонента
interface TodoItemProps {
	todo: Todo;
	index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [newText, setNewText] = useState(todo.text);
	
	// Хук для возможности перетаскивания элемента
	const [, drag] = useDrag({
		type: 'TODO_ITEM', // Указываем тип объекта
		item: { type: 'TODO_ITEM', id: todo.id, index },
	});
	
	// Хук для обработки событий при перетаскивании над элементом
	const [, drop] = useDrop({
		accept: 'TODO_ITEM', // Указываем принимаемый тип объекта
		hover(item: DragItem) {
			const dragIndex = item.index;
			const hoverIndex = index;
			
			if (dragIndex === hoverIndex) {
				return;
			}
			
			// Диспатчим действие для обновления порядка в хранилище
			dispatch(updateTodosOrder({ dragIndex, hoverIndex }));
			
			// Обновляем индекс элемента, который был перетащен, чтобы избежать мерцания
			item.index = hoverIndex;
		},
	});

// Обработчик для переключения статуса дела
	const handleToggle = () => {
		dispatch(toggleTodo(todo.id));
	};
	
	// Обработчик для удаления дела
	const handleRemove = () => {
		dispatch(removeTodo(todo.id));
	};
	
	// Обработчик для входа в режим редактирования
	const handleEdit = () => {
		setEditMode(true);
	};
	
	// Обработчик для сохранения изменений после редактирования
	const handleSaveEdit = () => {
		dispatch(editTodo({ id: todo.id, newText }));
		setEditMode(false);
	};
	
	// Обработчик для отмены редактирования
	const handleCancelEdit = () => {
		setNewText(todo.text);
		setEditMode(false);
	};
	
	return (
		<li ref={(node) => drag(drop(node))} style={{
			border: '1px solid #ddd',
			borderRadius: '4px',
			margin: '5px 0',
			padding: '10px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			backgroundColor: todo.completed ? '#e6ffe6' : 'inherit',
		}}>
			<input type="checkbox" checked={todo.completed} onChange={handleToggle} />
			{editMode ? (
				<>
					<input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
					<button onClick={handleSaveEdit}>Сохранить</button>
					<button onClick={handleCancelEdit}>Отмена</button>
				</>
			) : (
				<>
					<span>{todo.text}</span>
					<button onClick={handleEdit}>Редактировать</button>
					<button onClick={handleRemove}>Удалить</button>
				</>
			)}
		</li>
	);
};

export default TodoItem;
