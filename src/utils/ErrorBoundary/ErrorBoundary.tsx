import {ReactNode, Component, ErrorInfo} from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	
	// Инициализация состояния для отслеживания возникновения ошибок
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {hasError: false};
	}
	
	// Этот статический метод вызывается, когда в компоненте возникает ошибка.
	// Он обновляет состояние компонента, чтобы показать запасной UI в методе render.
	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return {hasError: true};
	}
	
	// Этот метод вызывается после возникновения ошибки в дочернем компоненте.
	// Он позволяет выполнять побочные эффекты, такие как логирование ошибок.
	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Ошибка", error, errorInfo);
	}
	
	// Метод render проверяет, возникла ли ошибка, и решает, какой UI отрисовать.
	render() {
		if (this.state.hasError) {
			
			// Если в состоянии есть ошибка, рендерим запасной UI.
			return (
				<div className="d-flex align-items-center justify-content-center vh-100">
					<div className="text-center">
						<div className="error mx-auto" data-text="Ошибка">Ошибка</div>
						<p className="lead text-gray-800 mb-5">Что-то пошло не так</p>
						<p className="text-gray-500 mb-0">Приносим извинения за неудобства, мы уже работаем над устранением...</p>
						<a href="/" className="btn btn-primary mt-4">Вернуться на главную</a>
					</div>
				</div>
			);
		}
		
		// Если ошибок нет, просто рендерим компоненты.
		return this.props.children;
	}
}

export default ErrorBoundary;