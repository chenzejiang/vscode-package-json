const vscode = require('vscode');
const open = require("open");
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('coin.focus', (link) => {
        open(link);
    }));
};