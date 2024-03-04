import React from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TodoList from './components/TodoList'
import { store } from './store/store'
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary'

function App() {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<DndProvider backend={HTML5Backend}>
					<div className='App'>
						<TodoList />
					</div>
				</DndProvider>
			</Provider>
		</ErrorBoundary>
	)
}

export default App