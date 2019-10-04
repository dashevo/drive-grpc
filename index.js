const UpdateStatePromiseClient = require('./clients/nodejs/UpdateStatePromiseClient');

const protocUpdateStateMessages = require('./clients/nodejs/update_state_protoc');

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
  pbjs: {
    ...pbjsUpdateStateMessages,
  },
  ...protocUpdateStateMessages,
};
