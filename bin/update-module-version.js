// Update foundry module
//

const execSync = require('child_process').execSync;
const fs = require('fs')
const path = require('path')

const FOUNDRY_MODULE = path.join(__dirname, '../src/module.json')
const PACKAGE_FILE = path.join(__dirname, '../package.json')

const runCommand = (command) => {
  console.log("Running command: ", command)
  return execSync(command)
}

runCommand(`npm version ${process.argv.slice(2).join(' ')}`)

const foundryInfo = JSON.parse(fs.readFileSync(FOUNDRY_MODULE))
const packageInfo = JSON.parse(fs.readFileSync(PACKAGE_FILE))

newVersion = packageInfo.version
foundryInfo.version = newVersion

fs.writeFileSync(FOUNDRY_MODULE, JSON.stringify(foundryInfo, null, 2))

runCommand(`git add ${FOUNDRY_MODULE}`)
runCommand(`git commit --amend --no-edit`)
runCommand(`git tag -fa -m '${argv[2]} v${newVersion}' v${newVersion}`)
