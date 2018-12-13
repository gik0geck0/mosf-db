// Simple Web Components

// A small and simple way to serve a Web Component based UI and plug in data

import path from 'path';
import url from 'url';
import fs from 'fs';
const __dirname = path.dirname(new url.URL(import.meta.url).pathname)

export function componentRepository(directory) {
    if (!directory) {
        directory = __dirname + '/components'
    }
    return (req, res) => {
        const cmpName = req.params.cmpname;
        if (fs.existsSync(directory)) {
            fs.readFile(directory + '/' + cmpName + '/' + cmpName + '.mjs', (err, data) => {
                if (err) {
                    throw err;
                }
                res.setHeader("content-type", "application/javascript");
                res.send(data);
            });
        } else {
            console.log("Component " + cmpName + " doesn't exist");
            res.status(404);
        }
    };
}

export function wclib() {
    return "<script>" +
        fs.readFileSync(__dirname + '/lib/js/wclib.js') +
        "</script>";
}

export function bootstrapcomponent(cmpName) {
    return onload("console.log('bootstrapping " + cmpName + "');"
    + "$WC.createComponent('" + cmpName + "',{}).then((cmp) => {"
        + "console.log('successfully loaded " + cmpName + "');"
        + "document.body.appendChild(cmp);"
    + "});"
    );
}
export function onload(body) { return "<script>console.log('hooking into document.onload'); window.addEventListener('load', () => {" + body + "});</script>"}
export function script(body) { return "<script>" + body + "</script>"}

export function a(label, url) 	{ return "<a href=\"" + url + "\">" + label + "</a>"; }
export function div(b) 	{ return tag("div", b); }
export function h1(b)		{ return tag("h1", b); }
export function html(t, b) 	{ return "<html><head>" + wclib() + "<title>" + t + "</title></head><body>" + b+ "</body></html>"; }
export function td(b)		{ return tag("td", b); }
export function th(b)		{ return tag("th", b); }
export function tr(b)		{ return tag("tr", b); }
export function table(b)	{ return tag("table", b); }
export function tag(tagName, content) { return "<" + tagName + ">" + content + "</" + tagName + ">"; }
// export function wcimport(cmpname)  { return "<link as='fetch' rel='preload' href='/ui/components/" + cmpname + ".html'>"; }
export function jsmodule(modulename) { return "<script type='module' href='/ui/components/" + cmpname + ".mjs' />"; }