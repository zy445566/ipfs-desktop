const path = require('path');
let app_dir = path.dirname(__dirname);
let ipfs_dir = path.join(app_dir,'ipfs',process.platform);
let ipfs_file_path;
if (process.platform=='win32') {
    ipfs_file_path = path.join(ipfs_dir,'ipfs.exe')
} else {
    ipfs_file_path = path.join(ipfs_dir,'ipfs')
}
module.exports = {
    app_dir:app_dir,
    ipfs_dir:ipfs_dir,
    ipfs_file_path:ipfs_file_path
}
