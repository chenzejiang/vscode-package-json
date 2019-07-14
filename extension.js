/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
// @ts-ignore
// const package1 = require("./package.json");
const App = require('./src/app');
exports.activate = function(context) {
    require('./src/regCommand')(context);
    new App(context);
    // console.log(package1);
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function() {
    console.log('您的扩展已被释放！')
};
