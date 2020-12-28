
/**
 * 
 * @param oldMappings 
 * @param newMappingsJson String Input metadata of the form { template: {c: componentName, l: label} }
 */
export function parseRoutes(oldMappings, newMappingsJson) {
    const newMappings = JSON.parse(newMappingsJson);
    if (oldMappings) {
        return Object.assign({}, oldMappings, newMappings);
    } else {
        return newMappings;
    }
}

export function getLinkDisposition(linkElement) {
    const linkTarget = linkElement.target;
    if (linkTarget !== '_blank' && isInApp(linkElement)) {
        return "navigate";
    }
    return "default";
}

// Assume: url is always of the form 'protocol://domain/path?query#fragment
export function isInApp(linkElement) {
    return linkElement.origin === window.location.origin;
}