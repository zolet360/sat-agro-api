require("dotenv").config();
const ee = require("@google/earthengine");

/**
 * Função para inicializar a API do Google Earth Engine
 */
function initializeGEE() {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(
      require(process.env.GEE_CREDENTIALS_PATH),
      () => {
        ee.initialize(null, null, resolve, reject);
      },
      reject
    );
  });
}

module.exports = { initializeGEE };
