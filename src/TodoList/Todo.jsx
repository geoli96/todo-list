import "./Todo.css";

function Todo({
    id,
    title,
    completed,
    prioritized,
    editing,
    editingValue,
    setEditingValue,
}) {
    return (
        <div
            className={`Todo ${completed ? "Todo--completed" : ""} ${editing === id ? "Todo--editing" : ""}`}
        >
            {editing !== id ? (
                title
            ) : (
                <input
                    type="text"
                    className="Todo__InlineInput"
                    title="Edit todo input"
                    size={undefined}
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                ></input>
            )}
        </div>
    );
}

export default Todo;
