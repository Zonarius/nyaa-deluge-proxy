const fs = require('fs-extra');
const Path = require('path');

const configFilePath = Path.join(__dirname, '..', 'config', 'config.json');

const defaults = {
  nyaaUrl: 'https://nyaa.si'
};

let config;

reload();

async function reload() {
  let fileConfig = {};
  if (fs.existsSync(configFilePath)) {
    fileConfig = JSON.parse(fs.readFileSync(configFilePath));
  }
  config = {
    ...defaults,
    ...fileConfig
  };
}

async function save() {
  await fs.ensureFile(configFilePath);
  await fs.writeFile(configFilePath, JSON.stringify(config, undefined, 2));
}

module.exports = {
  config,
  save,
  reload
};