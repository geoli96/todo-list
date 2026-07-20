import Todo from "./Todo";
import "./TodoList.css";
import { useEffect, useState } from "react";

function TodoList() {
    const [firstRender, setFirstRender] = useState(true);
    const [loadingTodos, setLoadingTodos] = useState(true);
    const [todos, setTodos] = useState([]);
    const [prioritizedTodos, setPrioritizedTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState("");
    const [showCompleted, setShowCompleted] = useState(true);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const todos = localStorage.getItem("todos");
        const prioritizedTodos = localStorage.getItem("prioritizedTodos");
        const completedTodos = localStorage.getItem("completedTodos");
        const showCompleted = localStorage.getItem("showCompleted");
        if (todos) {
            setTodos(JSON.parse(todos));
        }
        if (prioritizedTodos) {
            setPrioritizedTodos(JSON.parse(prioritizedTodos));
        }
        if (completedTodos) {
            setCompletedTodos(JSON.parse(completedTodos));
        }
        if (showCompleted) {
            setShowCompleted(JSON.parse(showCompleted));
        }
        setFirstRender(false);
        setLoadingTodos(false);
    }, []);

    useEffect(() => {
        if (firstRender) {
            return;
        }
        localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
    }, [showCompleted, firstRender]);

    useEffect(() => {
        if (firstRender) {
            return;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos, firstRender]);

    useEffect(() => {
        if (firstRender) {
            return;
        }
        localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    }, [completedTodos, firstRender]);

    useEffect(() => {
        if (firstRender) {
            return;
        }
        localStorage.setItem(
            "prioritizedTodos",
            JSON.stringify(prioritizedTodos),
        );
    }, [prioritizedTodos, firstRender]);

    const TodoListItem = ({ todo, prioritized }) => (
        <li className="TodoList__ListItem">
            <div className={"TodoList__ListItemContent"}>
                <div className={"TodoList__CheckboxTodoContainer"}>
                    <input
                        type="checkbox"
                        title="Todo completed checkbox"
                        onChange={() => {
                            const _todo = { ...todo };
                            if (!prioritized) {
                                setTodos((todos) => {
                                    const removeIndex = todos.findIndex(
                                        (t) => t.id === _todo.id,
                                    );
                                    return todos.toSpliced(removeIndex, 1);
                                });
                            } else {
                                setPrioritizedTodos((todos) => {
                                    const removeIndex = todos.findIndex(
                                        (t) => t.id === _todo.id,
                                    );
                                    return todos.toSpliced(removeIndex, 1);
                                });
                            }
                            setCompletedTodos((completedTodos) => {
                                return [...completedTodos, _todo];
                            });
                        }}
                    />
                    <Todo title={todo.title} />
                </div>
                <div className={"TodoList__TodoActions"}>
                    <div>
                        <button
                            className={`TodoList__TodoPrioritizeButton ${
                                prioritized
                                    ? " TodoList__TodoPrioritizeButton--prioritized"
                                    : ""
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                const _todo = { ...todo };
                                if (!prioritized) {
                                    _todo.prioritized = true;
                                } else {
                                    delete _todo.prioritized;
                                }
                                setTodos((todos) => {
                                    if (!prioritized) {
                                        const removeIndex = todos.findIndex(
                                            (t) => t.id === _todo.id,
                                        );
                                        return todos.toSpliced(removeIndex, 1);
                                    }
                                    return [...todos, _todo];
                                });
                                setPrioritizedTodos((prioritizedTodos) => {
                                    if (!prioritized) {
                                        return [...prioritizedTodos, _todo];
                                    }
                                    const removeIndex =
                                        prioritizedTodos.findIndex(
                                            (t) => t.id === _todo.id,
                                        );
                                    return prioritizedTodos.toSpliced(
                                        removeIndex,
                                        1,
                                    );
                                });
                            }}
                        >
                            Prioritize{prioritized ? "d" : ""}
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                if (!prioritized) {
                                    setTodos((todos) => {
                                        const removeIndex = todos.findIndex(
                                            (t) => t.id === todo.id,
                                        );
                                        return todos.toSpliced(removeIndex, 1);
                                    });
                                } else {
                                    setPrioritizedTodos((todos) => {
                                        const removeIndex = todos.findIndex(
                                            (t) => t.id === todo.id,
                                        );
                                        return todos.toSpliced(removeIndex, 1);
                                    });
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
    const CompletedTodoListItem = ({ todo }) => (
        <li className="TodoList__ListItem">
            <div className="TodoList__ListItemContent">
                <div className="TodoList__CheckboxTodoContainer">
                    <input
                        type="checkbox"
                        title="Todo completed checkbox"
                        checked
                        onChange={() => {
                            const _todo = { ...todo };
                            setCompletedTodos((completedTodos) => {
                                const removeIndex = completedTodos.findIndex(
                                    (t) => t.id === _todo.id,
                                );
                                return completedTodos.toSpliced(removeIndex, 1);
                            });
                            if (!_todo.prioritized) {
                                setTodos((todos) => {
                                    return [...todos, _todo];
                                });
                            } else {
                                setPrioritizedTodos((todos) => {
                                    return [...todos, _todo];
                                });
                            }
                        }}
                    />
                    <Todo completed={true} title={todo.title} />
                </div>
                <div className="TodoList__TodoActions">
                    <div>
                        <button
                            onClick={() =>
                                setCompletedTodos((todos) => {
                                    const removeIndex = todos.findIndex(
                                        (t) => t.id === todo.id,
                                    );
                                    return todos.toSpliced(removeIndex, 1);
                                })
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );

    return (
        <div className={"TodoList"}>
            <div className={"TodoList__Container"}>
                <form
                    name="todo-form"
                    id="todo-form"
                    className="TodoList__AddTodoForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!todoTitle) {
                            return;
                        }
                        setTodos((todos) => [
                            ...todos,
                            { title: todoTitle, id: counter },
                        ]);
                        setCounter((counter) => counter + 1);
                        setTodoTitle("");
                    }}
                >
                    <label htmlFor="todo-name">Todo name</label>
                    <div className="TodoList__AddTodoButtonsContainer">
                        <input
                            required
                            type="text"
                            placeholder="Enter todo"
                            size={undefined}
                            name="todo-name"
                            id="todo-name"
                            value={todoTitle}
                            onInput={(e) => setTodoTitle(e.currentTarget.value)}
                        />
                        <button
                            className="TodoList__AddTodoFormSubmitButton"
                            type="submit"
                        >
                            Add todo
                        </button>
                    </div>
                </form>
                <div>
                    <div className="TodoList__TitleAndShowCompletedContainer">
                        <h3 className="TodoList__ListTitle">
                            My todos
                            {todos.length + prioritizedTodos.length > 0
                                ? " (" +
                                  (todos.length + prioritizedTodos.length) +
                                  ")"
                                : null}
                        </h3>
                        <button
                            title={
                                showCompleted
                                    ? "Hide completed todos button"
                                    : "Show completed todos button"
                            }
                            className={`TodoList__ShowCompletedButton ${
                                completedTodos.length === 0
                                    ? "TodoList__ShowCompletedButton--noneCompleted"
                                    : ""
                            }`}
                            onClick={() => setShowCompleted((v) => !v)}
                        >
                            {showCompleted
                                ? "Hide completed"
                                : "Show completed"}{" "}
                            ({completedTodos.length})
                        </button>
                    </div>
                    {loadingTodos ? null : (
                        <ul className="TodoList__List">
                            {prioritizedTodos.length +
                                todos.length +
                                completedTodos.length ===
                            0 ? (
                                <li className="TodoList__ListItem TodoList__ListItem--noneAdded">
                                    No todos added..
                                </li>
                            ) : null}
                            {showCompleted && completedTodos.length ? (
                                <ul title="Completed todos">
                                    {completedTodos.map((todo) => (
                                        <CompletedTodoListItem
                                            key={todo.id}
                                            todo={todo}
                                        />
                                    ))}{" "}
                                </ul>
                            ) : null}
                            {prioritizedTodos.length ? (
                                <ul title="Prioritized todos">
                                    {prioritizedTodos.map((todo, i) => (
                                        <TodoListItem
                                            key={todo.id}
                                            todo={todo}
                                            i={i}
                                            prioritized={true}
                                        />
                                    ))}
                                </ul>
                            ) : null}
                            {todos.length ? (
                                <ul title="Todos">
                                    {todos.map((todo, i) => (
                                        <TodoListItem
                                            key={todo.id}
                                            todo={todo}
                                            i={i}
                                            prioritized={false}
                                        />
                                    ))}
                                </ul>
                            ) : null}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
