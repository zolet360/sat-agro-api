const ee = require("@google/earthengine");

/**
 * Função para inicializar a API do Google Earth Engine
 */
function initializeGEE() {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(
      require("../credentials/satagro-435200-49518d0863c9.json"),
      () => {
        ee.initialize(null, null, resolve, reject);
      },
      reject
    );
  });
}

module.exports = { initializeGEE };
