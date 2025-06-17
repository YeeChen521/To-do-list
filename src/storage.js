const STORAGE_KEY = "projects";

// Store raw JSON only
export function saveProjects(projects){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Only parse JSON — don't recreate class instances here
export function loadProjects(){
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
        return JSON.parse(data); // Keep raw format
    } catch (e) {
        console.error("Error parsing storage data:", e);
        return [];
    }
}
