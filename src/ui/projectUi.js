import { loadProjects, saveProjects } from "../storage";
import { createToDo } from "../todo";

export function renderProjectDetails(index) {
    console.log("Rendering project details for index:", index); 

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects[index];

    const container = document.getElementById("content");
    container.innerHTML = "";

    const projectHeader = document.createElement("div");
    projectHeader.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description || "No description"}</p>
        <p><strong>Deadline:</strong> ${project.dueDate}</p>
    `;

    const todoForm = document.createElement("div");
    const addTodoBtn = document.createElement("button");
    addTodoBtn.innerHTML = "Add Todo";
    todoForm.appendChild(addTodoBtn);

    const toDoDialog = document.querySelector(".create-todo");
    const todoCancelbtn = document.querySelector(".todo-cancel-btn");
    const form = toDoDialog.querySelector("form");

    const titleInput = document.getElementById("new-ttitle");
    const descInput = document.getElementById("new-tdesc");
    const dueDateInput = document.getElementById("new-tduedate");
    const priorityInput = document.getElementById("new-tpriority");
    const checklistInput = document.getElementById("new-tchecklist");

    let editingIndex = null; 

    addTodoBtn.addEventListener("click", () => {
        editingIndex = null;
        titleInput.value = "";
        descInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "low";
        checklistInput.checked = false;
        toDoDialog.showModal();
    });

    todoCancelbtn.addEventListener("click", () => {
        toDoDialog.close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const checklist = checklistInput.checked;

        if (title) {
            const newTodo = createToDo(title, desc, dueDate, priority, checklist);

            project.todos = project.todos || [];

            if (editingIndex !== null) {
                project.todos[editingIndex] = newTodo;
            } else {
                project.todos.push(newTodo);
            }

            saveProjects(projects);
            toDoDialog.close();
            renderTodos();
        }
    });

    const todoList = document.createElement("ul");
    todoList.classList.add("todo-list");

    const renderTodos = () => {
        todoList.innerHTML = "";

        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const sortedTodos = [...(project.todos || [])].sort((a, b) => {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        sortedTodos.forEach((todo, i) => {
            const li = document.createElement("li");
            li.classList.add("todo-item");

            li.innerHTML = `
                <strong>Title:</strong> ${todo.title}<br>
                <strong>Description:</strong> ${todo.description || "None"}<br>
                <strong>Due Date:</strong> ${todo.dueDate || "None"}<br>
                <strong>Priority:</strong> ${todo.priority || "None"}<br>
                <strong>Checklist:</strong> ${todo.checklist ? "✔ Completed" : "✘ Not completed"}
            `;

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => {
                editingIndex = project.todos.indexOf(todo); // find actual index in unsorted array

                titleInput.value = todo.title || "";
                descInput.value = todo.description || "";
                dueDateInput.value = todo.dueDate || "";
                priorityInput.value = todo.priority || "low";
                checklistInput.checked = !!todo.checklist;

                toDoDialog.showModal();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                const originalIndex = project.todos.indexOf(todo); 
                if (originalIndex !== -1) {
                    project.todos.splice(originalIndex, 1);
                    saveProjects(projects);
                    renderTodos();
                }
            });

            li.appendChild(document.createElement("br"));
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    };


    container.appendChild(projectHeader);
    container.appendChild(todoForm);
    container.appendChild(todoList);

    renderTodos();
}
