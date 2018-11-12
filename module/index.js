const appInfo = require('../util/getAppInfo');
const { exec, execSync } = require('child_process');
const { Writable } = require('stream');
const fs = require('fs');

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
            let writeStream = new Writable({
                write(chunk, encoding, callback) {
                    let outStr = chunk.toString();
                    if(outStr.indexOf('Daemon is ready') || outStr.indexOf('ipfs daemon is running')){
                        reslove(execSync(`${appInfo.ipfs_file_path} config Addresses.API`).toString())
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