import { SwcElement } from '/ui/components/swc-client.mjs';
import '/ui/components/nav-bar.mjs';

var template = document.createElement('template');
template.innerHTML = `
<h1>DB App</h1>
<div>
    <nav-bar />
</div>
`;

class DbApp extends SwcElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("DB App Loaded");
        /*
        setTimeout(() => {
            this.shadowRoot.querySelector('nav-bar').title = "App Nav Items";
        }, 50);
        */
    }

    static get template() {
        return template;
    }
}

window.customElements.define("db-app", DbApp);