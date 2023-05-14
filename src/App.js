import { useEffect, useReducer } from "react";

const TodoReducer = (state, action) => {
    switch (action.type) {
        case "todo":
            return { ...state, todos: action.payload };
        case "input":
            return { ...state, input: action.payload };
        case "search":
            return { ...state, searchKey: action.payload };
        default:
            throw new Error();
    }
};
function App() {
    // useReducer
    const [state, dispatch] = useReducer(TodoReducer, {
        todos: [],
        input: "",
        searchKey: "",
    });

    // Destructure State
    const { todos, input, searchKey } = state;

    // API Fetch
    const TodoFetch = async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/" + searchKey
        );
        const data = await response.json();
        dispatch({ type: "todo", payload: data });
    };

    // Form Submit
    const searchHandler = (e) => {
        e.preventDefault();
        dispatch({ type: "search", payload: input });
    };

    // API Fetch useEffect
    useEffect(() => {
        TodoFetch();
    }, [searchKey]);

    return (
        <>
            <div className="search">
                <form onSubmit={searchHandler}>
                    <input
                        type="text"
                        placeholder="Search with ID"
                        onChange={(e) =>
                            dispatch({ type: "input", payload: e.target.value })
                        }
                    />
                    <button>Search</button>
                </form>
            </div>
            <div className="content">
                {todos.length > 1 ? (
                    todos.map((todo) => {
                        const { userId, id, title, completed } = todo;
                        return (
                            <div className="box" key={id}>
                                <p className="divided">
                                    <span>
                                        <strong>ID</strong> - {id}
                                    </span>
                                    <span>Added by UserID - {userId}</span>
                                </p>
                                <p>
                                    <strong>Title</strong> - {title}
                                </p>
                                <p>
                                    <strong>Status</strong> -
                                    <span
                                        style={{
                                            color: completed ? "green" : "blue",
                                        }}
                                    >
                                        {completed ? " Completed" : " Pending"}
                                    </span>
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <div className="box" key={todos.id}>
                        <p className="divided">
                            <span>
                                <strong>ID</strong> - {todos.id}
                            </span>
                            <span>Added by UserID - {todos.userId}</span>
                        </p>
                        <p>
                            <strong>Title</strong> - {todos.title}
                        </p>
                        <p>
                            <strong>Status</strong> -
                            <span
                                style={{
                                    color: todos.completed ? "green" : "blue",
                                }}
                            >
                                {todos.completed ? " Completed" : " Pending"}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
