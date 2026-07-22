import TodoList from "./TodoList/TodoList";
import "./App.css";

function App() {
    return (
        <div className="App">
            <TodoList />
            <div className="Links__Container">
                <a href="mailto:goshaaz@outlook.com">Contact</a>
                <a href="https://www.paypal.com/paypalme/goshaaz">Donate</a>
            </div>
        </div>
    );
}

export default App;
