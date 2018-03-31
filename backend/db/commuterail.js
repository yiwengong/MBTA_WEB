const fs = require('fs');

const objects = JSON.parse(fs.readFileSync('../commuterrail.json', 'utf8'));

function getRoute() {
    var routes = [];
    objects.forEach(function(object) {
       routes.push(object.route);
    });
    return routes;
}

function getLine() {
    var setOfLine = new Set();
    objects.forEach(function(object) {
        object.line.forEach(function(l) {
            setOfLine.add(l);
        })
    });

    return setOfLine;
}

module.exports.routes = getRoute();

module.exports.setOfLine = getLine();

module.exports.routesToLines = objects;
