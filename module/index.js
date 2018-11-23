const appInfo = require('../util/getAppInfo');
const { spawn, spawnSync } = require('child_process');
let childDaemon = null;
module.exports = class Index {
    static outputInit() {
        try{
            return spawnSync(appInfo.ipfs_file_path, ['init']).output[1].toString();
        } catch(e) {
            return 'init complete';
        }
    }

    static outputDaemon(writeStream) {
        childDaemon = spawn(appInfo.ipfs_file_path, ['daemon']);
        childDaemon.stdout.pipe(writeStream);
        childDaemon.stderr.pipe(writeStream);
        return childDaemon;
    }
}