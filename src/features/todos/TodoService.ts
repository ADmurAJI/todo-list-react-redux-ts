export interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

// Сервис для работы с данными Todo, используя localStorage
export const TodoService = {
	// Получение списка дел из localStorage
	getTodosFromLocalStorage: (): Todo[] => {
		// Получаем строку с данными из localStorage
		const todosStr = localStorage.getItem('todos');
		// Если строка существует, парсим ее в массив объектов Todo, иначе возвращаем пустой массив
		return todosStr ? JSON.parse(todosStr) : [];
	},
	
	// Сохранение списка дел в localStorage
	saveTodosToLocalStorage: (todos: Todo[]): void => {
		// Преобразуем массив объектов Todo в строку и сохраняем в localStorage
		localStorage.setItem('todos', JSON.stringify(todos));
	},
};