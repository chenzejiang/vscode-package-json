const vscode = require('vscode');
module.exports = function(context) {
  context.subscriptions.push(vscode.commands.registerCommand('package-json.ls', (cmd) => {
    let terminal = vscode.window.createTerminal({
      name: 'vscode-package-json'
    });
    terminal.show(true);
    terminal.sendText(cmd);
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
    terminal.sendText('npm install');
  }));
  
  /**
   * 安装cnpm install
   */
  context.subscriptions.push(vscode.commands.registerCommand('package-json.cnpm.install', () => {
    let terminal = vscode.window.createTerminal({
      name: 'vscode-package-json'
    });
    terminal.show(true);
    terminal.sendText('cnpm install');
  }));
};