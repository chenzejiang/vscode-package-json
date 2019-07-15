const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('coin.focus', () => {
        let terminal = vscode.window.createTerminal({
			name: 'vscode-package-json'
		});
		terminal.show(true);
		terminal.sendText('ls');
    }));
    /**
     * 删除 node_modules 文件夹
     */
    context.subscriptions.push(vscode.commands.registerCommand('package-json.rm', () => {
        let terminal = vscode.window.createTerminal({
			name: 'vscode-package-json'
		});
		terminal.show(true);
		terminal.sendText('rm -rf node_modules');
    }));
    /**
     * 安装依赖
     */
    context.subscriptions.push(vscode.commands.registerCommand('package-json.npm.install', () => {
        let terminal = vscode.window.createTerminal({
			name: 'vscode-package-json'
		});
		terminal.show(true);
		terminal.sendText('npm install --registry=https://registry.npm.taobao.org');
    }));
};