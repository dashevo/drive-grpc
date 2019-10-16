const { loadPackageDefinition } = require('@dashevo/grpc-common');

function getUpdateStateDefinition() {
  const protoPath = '../protos/update_state.proto';

  return loadPackageDefinition(protoPath, 'org.dash.platform.drive.v0.UpdateState');
}

module.exports = getUpdateStateDefinition;
