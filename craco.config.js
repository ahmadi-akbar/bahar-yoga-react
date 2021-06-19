const path = require('path');
// const gitHash = require('child_process')
//   .execSync('git rev-parse HEAD')
//   .toString()
//   .trim();

// const now = new Date().toLocaleString('en-us');
// process.env.REACT_APP_VERSION = now + ', ' + gitHash;

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
