import { Draggable } from '../models/drag-drop-interfaces.js';
import { ProjectComponent } from '../components/project-component.js';
import { Project } from '../models/project.js';
import { autobind } from '../decorators/autobind.js';

export class ProjectItem extends ProjectComponent<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, 'beforeend', project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    get persons() {
        return (this.project.people === 1) ? ' 1 person' : `${this.project.people} people`
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(event: DragEvent) {
        console.log(event);
    }
}