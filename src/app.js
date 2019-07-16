const vscode = require('vscode');
const fse = require('fs-extra');
const TreeProvider = require("./TreeProvider");

class App {
    constructor(context){
        this.activateContext = context;
        this.packageObj = {};
        this.init();
    }
    /**
     * 获取脚本
     */
    getScriptsData() {
        const data = this.packageObj.scripts;
        console.log(data);
        return Object.keys(data).map((item, index) => {
            return {
                label: `npm run ${item}`,
                icon: `${index}.png`,
                extension: "package-json.ls"
            }
        });
    }
    /**
     * 自己增加的脚本
     */
    extensionScript(){
        return [
            {
                label: `npm install`,
                icon: `npm.png`,
                extension: "package-json.npm.install"
            },
            {
                label: `cnpm install`,
                icon: `cnpm.png`,
                extension: "package-json.cnpm.install"
            },
            {
                label: `rm -rf node_modules`,
                icon: `del.png`,
                extension: "package-json.rm"
            }
        ]
    }
    /*
     * 更新 ActivityBar
     */
    updateActivityBar() {
        /* 项目脚本 */
        const packageScriptProvider = new TreeProvider(vscode.workspace.rootPath, this.getScriptsData(), this.activateContext);
        vscode.window.registerTreeDataProvider("packageScript", packageScriptProvider);
        /* 自定义扩展脚本 */
        const extensionScriptProvider = new TreeProvider(vscode.workspace.rootPath, this.extensionScript(), this.activateContext);
        vscode.window.registerTreeDataProvider("extensionScript", extensionScriptProvider);
    }
    /**
     * 初始化 获取package.json的数据
     */
    init() {
        const packagePath = `${vscode.workspace.rootPath}\\package.json`;
        fse.readJson(packagePath)
        .then(packageObj => {
            this.packageObj = packageObj;
            this.updateActivityBar();
        })
        .catch(err => {
            console.error(err)
        });
    }
}
module.exports = App;