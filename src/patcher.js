const fs = require('fs')
const sysPath = require('path')
const { log } = require('./logger')

function walkSync (dir, pattern, cb) {
  fs.readdirSync(dir).forEach(function (file) {
    const path = sysPath.join(dir, file)
    if (fs.statSync(path).isDirectory()) {
      walkSync(path, pattern, cb)
    } else if (pattern.test(file)) {
      cb(path)
    }
  })
}

module.exports = function (path, oldPort, newPort) {
  const portPattern = new RegExp(`\\b${oldPort}\\b`, 'g')

  log(
    `Replacing react-native hard coded port ${oldPort} with ${newPort}...`
  )

  walkSync(path, /\.(m|h|js|java|pbxproj|cs)$/, file => {
    const content = fs.readFileSync(file, 'utf8')
    if (portPattern.test(content)) {
      fs.writeFileSync(file, content.replace(portPattern, newPort))
      log(`  - ${file.slice(path.length)}`)
    }
  })
}
