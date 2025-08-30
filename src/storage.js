const STORAGE_KEY = "projects";

export function saveProjects(projects){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects(){
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
        return JSON.parse(data); 
    } catch (e) {
        console.error("Error parsing storage data:", e);
        return [];
    }
}
