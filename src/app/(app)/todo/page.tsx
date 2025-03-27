"use client";
import TodoComponent from "@/components/general/todoComponent";
const todo = {
  id: "be40f79d-12c2-440c-967b-527a96043db4",
  createdBy: "f3799626-ba67-4479-9c3f-0f00729a47b6",
  title: "testing 2",
  description: "this is one of the todo for testing purpose",
  deadline: "2025-03-20T15:30:00.000Z",
  pinned: "UNPINNED",
  status: "PENDING",
  priority: "HIGH",
  createdAt: "2025-03-26T16:22:52.393Z",
  updatedAt: "2025-03-26T16:22:52.393Z",
};

function TodoList() {
  const handleDelete = (id) => {
    // Implement delete logic
  };

  const handleUpdate = (updatedTodo) => {
    // Implement update logic
  };

  const handleToggleComplete = (id) => {
    // Implement toggle complete logic
  };

  return <TodoComponent todo={todo} />;
}

export default TodoList;
