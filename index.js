const UpdateStatePromiseClient = require('./clients/nodejs/UpdateStatePromiseClient');

const protocUpdateStateMessages = require('./clients/nodejs/update_state_protoc');

const {
  org: {
    dash: {
      platform: {
        drive: pbjsUpdateStateMessages,
      },
    },
  },
} = require('./clients/nodejs/update_state_pbjs');

const loadPackageDefinition = require('./src/loadPackageDefinition');
const jsonToProtobufFactory = require('./src/converters/jsonToProtobufFactory');
const protobufToJsonFactory = require('./src/converters/protobufToJsonFactory');

module.exports = {
  UpdateStatePromiseClient,
  utils: {
    loadPackageDefinition,
    jsonToProtobufFactory,
    protobufToJsonFactory,
  },
  pbjs: {
    ...pbjsUpdateStateMessages,
  },
  ...protocUpdateStateMessages,
};
