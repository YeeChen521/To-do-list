import { renderProjectDetails } from "./projectUi";
export function displayProject(projectsToDisplay = null) {
  const projectList = document.querySelector("#project-list");
  projectList.innerHTML = "";

  const projects = projectsToDisplay || loadProjects();

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.classList.add("project-item");

    const titleSpan = document.createElement("span");
    titleSpan.textContent = project.title;
    titleSpan.classList.add("project-title");
    titleSpan.addEventListener("click", () => {
      renderProjectDetails(index);
    });

    const menuBtn = document.createElement("button");
    menuBtn.textContent = "⋮";
    menuBtn.classList.add("menu-btn");

    const menu = document.createElement("div");
    menu.classList.add("project-menu");
    menu.innerHTML = `
      <button class="rename-btn">Rename</button>
      <button class="delete-btn">Delete</button>
    `;
    menu.style.display = "none";

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    menu.querySelector(".delete-btn").addEventListener("click", () => {
      const allProjects = loadProjects();
      allProjects.splice(index, 1);
      saveProjects(allProjects);
      displayProject(allProjects);
    });

    menu.querySelector(".rename-btn").addEventListener("click", () => {
      const allProjects = loadProjects();
      const newTitle = prompt("Enter new project title:", project.title);
      if (newTitle) {
        allProjects[index].title = newTitle;
        saveProjects(allProjects);
        displayProject(allProjects);
      }
    });

    li.appendChild(titleSpan);
    li.appendChild(menuBtn);
    li.appendChild(menu);
    projectList.appendChild(li);
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".project-menu").forEach(menu => {
      menu.style.display = "none";
    });
  });
}
