export class SwcElement extends HTMLElement {
    constructor() {
        super();
        const template = this.constructor.template;
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }
  }