import { SwcElement } from '/ui/components/swc-client.mjs';

var template = document.createElement('template');
template.innerHTML = `
<div>
    <h2>{listName}</h2>
</div>
`;

class NavBar extends SwcElement {
    constructor() {
        super();
        this.listName = "My List";
        console.log("Initialized list");
    }

    set title(newName) {
        this.listName = newName;
        this.shadowRoot.querySelector('h2').innerHTML = this.listName;
        console.log("Set title to " + newName);
    }

    static get template() {
        return template;
    }
}

window.customElements.define("nav-bar", NavBar);