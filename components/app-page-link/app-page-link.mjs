import { SwcElement } from '/ui/components/swc-client.mjs';
import { getLinkDisposition } from '/ui/components/router-service.mjs';

var template = document.createElement('template');
template.innerHTML = `
<a href="#">App Page Link</a>
`;

class AppPageLink extends SwcElement {
    constructor() {
        super();
        this.element = this.shadowRoot.querySelector("a");
        if (this.getAttribute("label")) {
            this.pushAttributeToElement("label");
        }
        if (this.getAttribute("href")) {
            this.pushAttributeToElement("href");
        }

        // attachLinkHandler(this.shadowRoot.querySelector('a'), this.dispatchEvent);
        this.shadowRoot.querySelector('a').addEventListener("click", this.handleLinkClick.bind(this));
    }

    handleLinkClick(event) {
        const linkElement = event.target;
        const disposition = getLinkDisposition(linkElement);
        if (disposition === 'navigate') {
            this.navigate(event);
        }
    }

    navigate(event) {
        event.preventDefault();
        event.stopPropagation();
        const linkElement = event.target;
        console.log("Firing 'navigate' event");
        this.dispatchEvent(new CustomEvent("navigate", {
            detail: {
                url: linkElement.pathname + linkElement.search + linkElement.hash,
            },
            bubbles: true,
            composed: true
        }));
    }

    connectedCallback() {
    }

    pushAttributeToElement(name) {
        let value = this.getAttribute(name);
        switch (name) {
            case "label":
                this.element.innerText = value;
                break;
            default:
                this.element.setAttribute(name, value);
                break;
        }
    }

    static get observedAttributes() {
        return ["href", "label"];
    }

    attributeChangedCallback(name) {
        this.pushAttributeToElement(name);
    }

    static get template() {
        return template;
    }
}

window.customElements.define("app-page-link", AppPageLink);