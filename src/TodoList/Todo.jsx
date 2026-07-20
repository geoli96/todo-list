import "./Todo.css";

function Todo({ title, completed }) {
    return (
        <div className={`Todo ${completed ? "Todo--completed" : ""}`}>
            {title}
        </div>
    );
}

export default Todo;
