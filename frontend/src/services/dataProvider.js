import { projects as staticProjects } from "./staticData";
import { fetchProjects } from "../services/projectService";

const USE_API = false;

export const getProjects = async () => {
    if (USE_API) {
        return await fetchProjects();
    }
    return staticProjects;
};


import api from "./api";

export const fetchProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
};