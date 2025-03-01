import { Project, ProjectStatus } from '../models/project.js';

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[];
    private static instance: ProjectState;

    private constructor() {
        super();
        this.projects = [];
    }

    static getInstance() {
        if(this.instance) {
            return this.instance
        } else {
            this.instance = new ProjectState();
            return this.instance
        }
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        this.updateListeners();
        
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const foundProject = this.projects.find(project => project.id === projectId);
        if(foundProject && foundProject.status !== newStatus) {
            foundProject.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for(const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }
}

export const projectState = ProjectState.getInstance();