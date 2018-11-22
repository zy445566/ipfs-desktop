const appInfo = require('../util/getAppInfo');
const { exec, execSync } = require('child_process');
let childDaemon = null;
module.exports = class Index {
    static outputInit() {
        try{
            return execSync(`${appInfo.ipfs_file_path} init`).toString();
        } catch(e) {
            return 'init complete';
        }
    }

    static outputDaemon(writeStream) {
        childDaemon = exec(`${appInfo.ipfs_file_path} daemon`);
        childDaemon.stdout.pipe(writeStream);
        childDaemon.stderr.pipe(writeStream);
        return childDaemon;
    }
}