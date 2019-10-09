const vscode = require('vscode');

module.exports = function(context) {
  context.subscriptions.push(vscode.commands.registerCommand('package-json.cmd', (cmd) => {
    let terminal = vscode.window.createTerminal({
      name: 'vscode-package-json'
    });
    terminal.show(true);
    terminal.sendText(cmd);
  }));
};