const vscode = require("vscode");
const path   = require("path");

class ItemLucky extends vscode.TreeItem {
    constructor(label, collapsibleState, command, iconPath) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.contextValue = "";
        this.iconPath = iconPath;
    }
}

module.exports = class TreeProvider {
    constructor(workspace, data, context) {
        this.data = data;
        this.workspaceRoot = workspace;
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.isRefresh = false;
    }

    refresh() {
        this.isRefresh = true;
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(item) {
        return item;
    }

    getChildren() {
        return this.data.map((item) => {
            return this.newLuckyItem(item);
        });
    }
    
    newLuckyItem(item) {
        const {
            label,
            cmd,
            extension,
            icon
        } = item;
        console.log(icon);
        let darkIcon = path.join(__dirname, "..", "icon", icon);
        let lightIcon = path.join(__dirname, "..", "icon", icon);

        return new ItemLucky(label, vscode.TreeItemCollapsibleState.None, {
            title: label,
            command: extension,
            arguments: [cmd]
        }, {
            dark: darkIcon,
            light: lightIcon
        })
    }
}