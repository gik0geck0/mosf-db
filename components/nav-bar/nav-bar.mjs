import { SwcElement } from '/ui/components/swc-client.mjs';
import { parseRoutes } from '/ui/components/router-service.mjs';
import '/ui/components/app-page-link.mjs';

var template = document.createElement('template');
template.innerHTML = `
<div>
    <h2>{listName}</h2>
    <nav id="nav-list">
    </nav>
</div>
`;

class NavBar extends SwcElement {
    constructor() {
        super();
        this.templateMapping = parseRoutes(this.templateMapping, this.getAttribute("routes"));
        this.navList = this.shadowRoot.querySelector("#nav-list");
    }

    static get observedAttributes() {
        return ['routes'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'routes':
                // Bulk save to templateMapping; if we listen to templateMapping changing, we want all of this in 1 transaction
                this.templateMapping = parseRoutes(this.templateMapping, newValue);
                break;
        }
    }

    connectedCallback() {
        Object.keys(this.templateMapping).forEach((url) => {
            const thisMapping = this.templateMapping[url];
            const newLink = document.createElement("app-page-link");
            newLink.setAttribute("href", url);
            newLink.setAttribute("label", thisMapping.l);
            this.navList.appendChild(newLink);
        });
    }

    static get template() {
        return template;
    }
}

window.customElements.define("nav-bar", NavBar);