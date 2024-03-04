import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';
import {Component, ReactNode} from "react";

describe('ErrorBoundary', () => {
	
	it('отображает дочерний компонент, если ошибок нет', () => {
		
		// Создаем дочерний компонент
		const ChildComponent = () => <div>Child component</div>;
		
		const {getByText} = render(
			<ErrorBoundary>
				<ChildComponent/>
			</ErrorBoundary>
		);
		expect(getByText('Child component')).toBeInTheDocument();
	})
	
	it('отображает запасной UI, если есть ошибка', () => {
		
		// Создаём компонент с ошибкой
		interface ErrorComponentProps {}
		interface ErrorComponentState {}
		class ErrorComponent extends Component<ErrorComponentProps, ErrorComponentState> {
			
			render():ReactNode {
				throw new Error('Test error');
			}
		}
		
		const { getByText } = render(
			<ErrorBoundary>
				<ErrorComponent />
			</ErrorBoundary>
		);
		
		// Проверяем, что отображается UI ошибки ErrorBoundary
		expect(getByText('Ошибка')).toBeInTheDocument();
		expect(getByText('Что-то пошло не так')).toBeInTheDocument();
		expect(getByText('Приносим извинения за неудобства, мы уже работаем над устранением...')).toBeInTheDocument();
		expect(getByText('Вернуться на главную')).toBeInTheDocument();
	});
});