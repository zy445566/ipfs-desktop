const appInfo = require('../util/getAppInfo');
const { exec, execSync } = require('child_process');
const { Writable } = require('stream');
const os = require('os');

module.exports = class Index {
    static outputInit() {
        try{
            return execSync(`${appInfo.ipfs_file_path} init`).toString();
        } catch(e) {
            return 'init complete';
        }
    }
    static outputDaemon() {
        return new Promise ((reslove,reject)=>{
            let outStr = '';
            let writeStream = new Writable({
                write(chunk, encoding, callback) {
                    outStr += chunk.toString();
                    if(outStr.indexOf('Daemon is ready')>-1){
                        return reslove(outStr + execSync(`${appInfo.ipfs_file_path} config Addresses.API`).toString())
                    }
                    let runningStr = 'ipfs daemon is running';
                    if (outStr.indexOf(runningStr)>-1) {
                        return reslove(runningStr +os.EOL+ execSync(`${appInfo.ipfs_file_path} config Addresses.API`).toString())
                    }
                    callback();
                }
            }) 
            let childDaemon = exec(`${appInfo.ipfs_file_path} daemon`);
            childDaemon.stdout.pipe(writeStream);
            childDaemon.stderr.pipe(writeStream);
        })
    }
}