const API_BASE = "http://localhost:9090";

export async function fetchAllTodos() {
  const response = await fetch(`${API_BASE}/todos`);
  if (!response.ok) throw new Error("Error obtaining data");
  return response.json();
}

export async function fetchTodosPage(
  num: number,
  text: string,
  priority: string,
  done: string,
  sort: string
) {
  const url =
    `${API_BASE}/todos/page/${num}` +
    `?text=${encodeURIComponent(text)}` +
    `&priority=${encodeURIComponent(priority)}` +
    `&done=${encodeURIComponent(done)}` +
    `&sort=${encodeURIComponent(sort)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error obtaining data");
  return response.json();
}

export async function createTodo(todo: any) {
  const response = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Error creating todo");
  return response.json();
}

export async function updateTodo(id: number, updates: any) {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Error updating todo");
  return response.json();
}

export async function setTodoDone(id: number) {
  const response = await fetch(`${API_BASE}/todos/${id}/done`, {
    method: "POST"
  });
  if (!response.ok) throw new Error("Error setting todo as done");
  return response.text();
}

export async function setTodoUndone(id: number) {
  const response = await fetch(`${API_BASE}/todos/${id}/undone`, {
    method: "PUT"
  });
  if (!response.ok) throw new Error("Error marking todo as undone");
  return response.text();
}

export async function deleteTodo(id: number) {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting todo");
  return response.text();
}