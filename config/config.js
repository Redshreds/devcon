// const Config = require('config').util.Config;
// const productionConfig = new Config();

const productionConfig = JSON.parse(RODUCTION_CONFIG);

module.exports = {
  productionConfig,
};
