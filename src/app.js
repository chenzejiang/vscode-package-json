const vscode = require('vscode');
const util = require('./util');
const TreeProvider = require("./TreeProvider");

// @ts-ignore
const packageData = require("./../package.json");

class App {
    constructor(context){
        this.activateContext = context;
        this.coins = util.getConfigurationCoin();
        this.init();
    }
    /**
     * 获取脚本
     */
    getScriptsData() {
        return Object.keys(packageData.scripts).map((item, index) => {
            return {
                label: `npm run ${item}`,
                icon: `${index}.png`,
                extension: "coin.focus"
            }
        });
    }
    /**
     * 自己增加的脚本
     */
    addCustomScript(){
        return [
            {
                label: `npm install`,
                icon: `npm.png`,
                extension: "coin.focus"
            },
            {
                label: `rm -rf node_modules`,
                icon: `del.png`,
                extension: "coin.focus"
            }
        ]
    }
    /*
     * 更新 ActivityBar
     */
    updateActivityBar() {
        const scriptData = this.getScriptsData().concat(this.addCustomScript());
        console.log(scriptData);
        let provider = new TreeProvider(vscode.workspace.rootPath, scriptData, this.activateContext);
        vscode.window.registerTreeDataProvider("packageScripts", provider);
    }
    /**
     * 初始化
     */
    init() {
        console.log('app-init');
        this.updateActivityBar();
    }
}
module.exports = App;