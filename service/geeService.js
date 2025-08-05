require("dotenv").config();
const ee = require("@google/earthengine");

const geeCredentials = JSON.parse(process.env.GEE_CREDENTIALS_PATH);

function initializeGEE() {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(
      geeCredentials,
      () => {
        ee.initialize(null, null, resolve, reject);
      },
      reject
    );
  });
}

module.exports = { initializeGEE };
