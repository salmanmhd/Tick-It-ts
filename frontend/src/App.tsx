import { useEffect, useState } from "react";

interface Todo {
  title: string;
  completed: boolean;
  _id: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    console.log(data);
    setTodos(data.todos);
  }

  async function handleAddTodo(e: any) {
    e.preventDefault();
    if (!todoTitle) return;
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todoTitle }),
      });
      const data = await response.json();
      const newTodo = data.todo;
      console.log(data);
      if (response.ok) {
        setTodos((todos) => [...todos, newTodo]);
        setTodoTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: string) {
    console.log(id);
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const filteredTodo: Todo[] = todos.filter((todo) => todo._id !== id);
        setTodos(filteredTodo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleComplete(id: string, status: boolean) {
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setTodos((prevTodo) =>
          prevTodo.map((todo) =>
            todo._id === id ? { ...todo, completed: !status } : todo,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-900 p-6 text-gray-200">
      <header className="ml-4 mt-4 drop-shadow-2xl">
        <h1 className="text-4xl font-semibold">Tick It</h1>
        <p className="pl-1 leading-3">Plan it, do it</p>
      </header>
      <form
        onSubmit={(e) => handleAddTodo(e)}
        className="mt-8 flex items-center"
      >
        <input
          type="text"
          className="h-10 w-96 rounded-l-full px-5 text-lg text-gray-950"
          placeholder="Enter todo..."
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button className="h-10 w-20 rounded-r-full bg-emerald-800 text-white">
          Add +
        </button>
      </form>
      <section className="mt-8 max-h-[31rem] w-[35rem] overflow-y-auto">
        {todos.map((todo, i) => (
          <TodoItems
            todo={todo}
            key={i}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
          />
        ))}
      </section>
    </div>
  );
}
interface TodoProp {
  todo: Todo;
  handleDelete: (id: string) => void;
  handleComplete: (id: string, status: boolean) => void;
}

function TodoItems({ todo, handleDelete, handleComplete }: TodoProp) {
  const { title, completed, _id: id } = todo;

  return (
    <div className="mb-5 flex justify-between px-4">
      <p className="text-xl">{title}</p>
      <div className="flex items-center gap-x-4">
        <input
          type="checkbox"
          className="accent-blue-600"
          checked={completed}
          onChange={() => handleComplete(id, completed)}
        />
        <p
          className="cursor-pointer pb-1 text-xl font-semibold"
          onClick={() => handleDelete(id)}
        >
          x
        </p>
      </div>
    </div>
  );
}

export default App;
