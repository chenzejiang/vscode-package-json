const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('coin.focus', () => {
        // open(link);
        let terminal = vscode.window.createTerminal({
			name: 'vscode-package-json'
		});
		terminal.show(true);
		terminal.sendText('ls');
    }));
};