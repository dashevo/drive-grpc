const path = require('path');

const { loadPackageDefinition } = require('@dashevo/grpc-common');

function getUpdateStateDefinition() {
  const protoPath = path.join(__dirname, '../protos/update_state.proto');

  return loadPackageDefinition(protoPath, 'org.dash.platform.drive.v0.UpdateState');
}

module.exports = getUpdateStateDefinition;
