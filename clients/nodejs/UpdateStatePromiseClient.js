const grpc = require('grpc');
const { promisify } = require('util');

const loadPackageDefinition = require('../../src/loadPackageDefinition');

const isObject = require('../../src/isObject');
const convertObjectToMetadata = require('../../src/convertObjectToMetadata');

const jsonToProtobufInterceptorFactory = require(
  '../../src/interceptors/client/jsonToProtobufInterceptorFactory',
);
const jsonToProtobufFactory = require('../../src/converters/jsonToProtobufFactory');
const protobufToJsonFactory = require('../../src/converters/protobufToJsonFactory');

const {
  org: {
    dash: {
      platform: {
        drive: {
          StartTransactionRequest: PBJSStartTransactionRequest,
          StartTransactionResponse: PBJSStartTransactionResponse,
          ApplyStateTransitionRequest: PBJSApplyStateTransitionRequest,
          ApplyStateTransitionResponse: PBJSApplyStateTransitionResponse,
          CommitTransactionRequest: PBJSCommitTransactionRequest,
          CommitTransactionResponse: PBJSCommitTransactionResponse,
        },
      },
    },
  },
} = require('./update_state_pbjs');

const {
  StartTransactionResponse: ProtocStartTransactionResponse,
  ApplyStateTransitionResponse: ProtocApplyStateTransitionResponse,
  CommitTransactionResponse: ProtocCommitTransactionResponse,
} = require('./update_state_protoc');

const {
  UpdateState: UpdateStateNodeJSClient,
} = loadPackageDefinition('UpdateState');

const startTransactionOptions = {
  interceptors: [
    jsonToProtobufInterceptorFactory(
      jsonToProtobufFactory(
        ProtocStartTransactionResponse,
        PBJSStartTransactionResponse,
      ),
      protobufToJsonFactory(
        PBJSStartTransactionRequest,
      ),
    ),
  ],
};

const applyStateTransitionOptions = {
  interceptors: [
    jsonToProtobufInterceptorFactory(
      jsonToProtobufFactory(
        ProtocApplyStateTransitionResponse,
        PBJSApplyStateTransitionResponse,
      ),
      protobufToJsonFactory(
        PBJSApplyStateTransitionRequest,
      ),
    ),
  ],
};

const commitTransactionOptions = {
  interceptors: [
    jsonToProtobufInterceptorFactory(
      jsonToProtobufFactory(
        ProtocCommitTransactionResponse,
        PBJSCommitTransactionResponse,
      ),
      protobufToJsonFactory(
        PBJSCommitTransactionRequest,
      ),
    ),
  ],
};

class UpdateStatePromiseClient {
  /**
   * @param {string} hostname
   * @param {?Object} credentials
   * @param {?Object} options
   */
  constructor(hostname, credentials = grpc.credentials.createInsecure(), options = {}) {
    this.client = new UpdateStateNodeJSClient(hostname, credentials, options);

    this.client.startTransaction = promisify(
      this.client.startTransaction.bind(this.client),
    );

    this.client.applyStateTransition = promisify(
      this.client.applyStateTransition.bind(this.client),
    );

    this.client.commitTransaction = promisify(
      this.client.commitTransaction.bind(this.client),
    );
  }

  /**
   * @param {!StartTransactionRequest} startTransactionRequest
   * @param {?Object<string, string>} metadata
   * @return {Promise<!StartTransactionResponse>}
   */
  startTransaction(startTransactionRequest, metadata = {}) {
    if (!isObject(metadata)) {
      throw new Error('metadata must be an object');
    }

    return this.client.startTransaction(
      startTransactionRequest,
      convertObjectToMetadata(metadata),
      startTransactionOptions,
    );
  }

  /**
   * @param {!ApplyStateTransitionRequest} applyStateTransitionRequest
   * @param {?Object<string, string>} metadata
   * @return {Promise<!ApplyStateTransitionResponse>}
   */
  applyStateTransition(applyStateTransitionRequest, metadata = {}) {
    if (!isObject(metadata)) {
      throw new Error('metadata must be an object');
    }

    return this.client.applyStateTransition(
      applyStateTransitionRequest,
      convertObjectToMetadata(metadata),
      applyStateTransitionOptions,
    );
  }

  /**
   * @param {!CommitTransactionRequest} commitTransactionRequest
   * @param {?Object<string, string>} metadata
   * @return {Promise<!CommitTransactionResponse>}
   */
  commitTransaction(commitTransactionRequest, metadata = {}) {
    if (!isObject(metadata)) {
      throw new Error('metadata must be an object');
    }

    return this.client.commitTransaction(
      commitTransactionRequest,
      convertObjectToMetadata(metadata),
      commitTransactionOptions,
    );
  }
}

module.exports = UpdateStatePromiseClient;
