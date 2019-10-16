const UpdateStatePromiseClient = require('./clients/nodejs/UpdateStatePromiseClient');

const protocUpdateStateMessages = require('./clients/nodejs/update_state_protoc');

const getUpdateStateDefinition = require('./lib/getUpdateStateDefinition');

const {
  org: {
    dash: {
      platform: {
        drive: {
          v0: pbjsUpdateStateMessages,
        },
      },
    },
  },
} = require('./clients/nodejs/update_state_pbjs');

module.exports = {
  UpdateStatePromiseClient,
  getUpdateStateDefinition,
  pbjs: {
    ...pbjsUpdateStateMessages,
  },
  ...protocUpdateStateMessages,
};
