import "./style.css";
import { createProject } from "./project";
import { saveProjects, loadProjects } from "./storage";
import { displayProject } from "./ui/indexUi";
import { renderProjectDetails } from "./ui/projectUi";

const projects = loadProjects();

displayProject(projects);

document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.querySelector("#create-project");
  const dialog = document.querySelector(".create-project-dialog");
  const cancelbtn = document.querySelector(".cancel-btn");
  const form = dialog.querySelector("form");

  createBtn.addEventListener("click", () => {
    dialog.showModal();
  });
  
  const searchInput = document.getElementById("project-name");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const allProjects = loadProjects();
    const filteredProjects = allProjects.filter(project =>
      project.title.toLowerCase().includes(keyword)
    );
    displayProject(filteredProjects);
  });

  form.addEventListener("submit", () => {
    const title = document.getElementById("new-title").value;
    const description = document.getElementById("new-desc").value;
    const dueDate = document.getElementById("new-deadline").value;

    const newProject = createProject(title, description, dueDate);
    projects.push(newProject);
    saveProjects(projects);
    displayProject(projects);
    form.remove();
    dialog.close();
    });
  cancelbtn.addEventListener("click",() => {
    dialog.close();
  })
});


