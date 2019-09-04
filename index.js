const TransactionPromiseClient = require('./clients/nodejs/TransactionPromiseClient');

const protocTransactionMessages = require('./clients/nodejs/transaction_protoc');

const {
  org: {
    dash: {
      platform: {
        drive: pbjsTransactionMessages,
      },
    },
  },
} = require('./clients/nodejs/transaction_pbjs');

const loadPackageDefinition = require('./src/loadPackageDefinition');
const jsonToProtobufFactory = require('./src/converters/jsonToProtobufFactory');
const protobufToJsonFactory = require('./src/converters/protobufToJsonFactory');

module.exports = {
  TransactionPromiseClient,
  utils: {
    loadPackageDefinition,
    jsonToProtobufFactory,
    protobufToJsonFactory,
  },
  pbjs: {
    ...pbjsTransactionMessages,
  },
  ...protocTransactionMessages,
};
