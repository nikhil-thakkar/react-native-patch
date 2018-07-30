const fs = require('fs');
const sysPath = require('path');
const { log, error } = require('./logger');

function _isReactNative(path) {
  if (!fs.existsSync(path)) {
    log(error(`Path does not exist:\n${path}\n`));
    return false;
  }
  if (!fs.existsSync(`${path}/package.json`)) {
    log(error(`Not an npm package:\n${path}\n`));
    return false;
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(`${path}/package.json`));
    if (pkg.name !== 'react-native' && pkg.name != 'react-native-windows') {
      log(error(`Not react-native:\n${path}\n`));
      return false;
    }
  } catch (e) {
    log(error(`Error in react-native package.json:\n${e}\n`));
    return false;
  }
  return true;
}

function walkSync(dir, pattern, cb) {
  fs.readdirSync(dir).forEach(function (file) {
    const path = sysPath.join(dir, file);
    if (fs.statSync(path).isDirectory()) {
      filelist = walkSync(path, pattern, cb);
    } else if (pattern.test(file)) {
      cb(path);
    }
  });
}

module.exports = function (path, oldPort, newPort) {
  const portPattern = new RegExp(`\\b${oldPort}\\b`, "g");

  log(
    `Replacing react-native hard coded port ${oldPort} with ${newPort}...`
  );

  walkSync(path, /\.(m|h|js|java|pbxproj|cs)$/, file => {
    const content = fs.readFileSync(file, "utf8");
    if (portPattern.test(content)) {
      fs.writeFileSync(file, content.replace(portPattern, newPort));
      log(`  - ${file.slice(path.length)}`);
    }
  });
};
