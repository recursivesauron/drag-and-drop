// Component Base Class
export abstract class ProjectComponent<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    rootElement: T;
    element: U;

    constructor(
        templateId: string, 
        rootElementId: string,
        insertPosition: InsertPosition, 
        newElementId?: string
        
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.rootElement = document.getElementById(rootElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = newElementId
        };

        this.attach(insertPosition);
    }

    private attach(insertPosition: InsertPosition) {
        this.rootElement.insertAdjacentElement(insertPosition, this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}