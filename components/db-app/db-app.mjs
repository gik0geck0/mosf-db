import { SwcElement } from '/ui/components/swc-client.mjs';
import '/ui/components/nav-bar.mjs';

var template = document.createElement('template');
template.innerHTML = `
<h1>DB App</h1>
<div id="app-root">
    <nav-bar />
    <div id="app-body" />
</div>
`;

class DbApp extends SwcElement {
    constructor() {
        super();
        this.appRoot = this.shadowRoot.querySelector("#app-root");
        this.appBody = this.shadowRoot.querySelector("#app-body");
        this.appRoot.addEventListener("navigate", this.navigateHandler);
        this.routes = {
            "/ui": {
                "c": "home",
                "l": "Home"
            },
            "/ui/list": {
                "c": "list",
                "l": "Object List"
            }
        };
        this.shadowRoot.querySelector("nav-bar").setAttribute("routes", JSON.stringify(this.routes));

    }

    connectedCallback() {
        console.log("DB App Loaded");
    }

    navigateHandler(event) {
        console.log("DB-App received 'navigate' event");
        const requestedUrl = event.detail.url;
        const routeMetadata = this.routes[requestedUrl];
        if (!routeMetadata) {
            throw new Error("Unknown app route: " + requestedUrl);
        }
        const cmp = routeMetadata.c;
        import("/ui/components/" + cmp + ".mjs").then(function() {
            this.appBody.innerHTML = "<" + cmp + " />";
        }.bind(this));
        debugger
    }

    static get template() {
        return template;
    }
}

window.customElements.define("db-app", DbApp);