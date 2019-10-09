const vscode       = require('vscode');
const fse          = require('fs-extra');
const TreeProvider = require("./TreeProvider");
const os           = require('os');

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
            const iconNum = index > 30 ? index - 31 : index;  
            return {
                label: `npm run ${item}`,
                cmd: `npm run ${item}`,
                icon: `${iconNum}.png`,
                extension: "package-json.cmd"
            }
        });
    }
    /*
     * 更新 ActivityBar
     */
    updateActivityBar() {
        /* 项目脚本 */
        const packageScriptProvider = new TreeProvider(vscode.workspace.rootPath, this.getScriptsData(), this.activateContext);
        vscode.window.registerTreeDataProvider("packageScript", packageScriptProvider);
    }
    /**
     * 初始化 获取package.json的数据
     */
    init() {
        const pathFlag = os.platform() === 'win32' ? '\\' : '/';
        const packagePath = `${vscode.workspace.rootPath}${pathFlag}package.json`;
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