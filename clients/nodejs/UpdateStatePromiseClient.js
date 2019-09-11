const grpc = require('grpc');
const { promisify } = require('util');

const loadPackageDefinition = require('../../src/loadPackageDefinition');

const isObject = require('../../src/isObject');
const convertObjectToMetadata = require('../../src/convertObjectToMetadata');
const metadataToObjectInterceptorFacory = require(
  '../../src/interceptors/client/metadataToObjectInterceptorFactory',
);

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
          v1: {
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
  },
} = require('./update_state_pbjs');

const {
  StartTransactionResponse: ProtocStartTransactionResponse,
  ApplyStateTransitionResponse: ProtocApplyStateTransitionResponse,
  CommitTransactionResponse: ProtocCommitTransactionResponse,
} = require('./update_state_protoc');

const {
  v1: {
    UpdateState: UpdateStateNodeJSClient,
  },
} = loadPackageDefinition('UpdateState');

const startTransactionOptions = {
  interceptors: [
    metadataToObjectInterceptorFacory(
      isObject, convertObjectToMetadata,
    ),
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
    metadataToObjectInterceptorFacory(
      isObject, convertObjectToMetadata,
    ),
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
    metadataToObjectInterceptorFacory(
      isObject, convertObjectToMetadata,
    ),
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
    return this.client.startTransaction(
      startTransactionRequest,
      metadata,
      startTransactionOptions,
    );
  }

  /**
   * @param {!ApplyStateTransitionRequest} applyStateTransitionRequest
   * @param {?Object<string, string>} metadata
   * @return {Promise<!ApplyStateTransitionResponse>}
   */
  applyStateTransition(applyStateTransitionRequest, metadata = {}) {
    return this.client.applyStateTransition(
      applyStateTransitionRequest,
      metadata,
      applyStateTransitionOptions,
    );
  }

  /**
   * @param {!CommitTransactionRequest} commitTransactionRequest
   * @param {?Object<string, string>} metadata
   * @return {Promise<!CommitTransactionResponse>}
   */
  commitTransaction(commitTransactionRequest, metadata = {}) {
    return this.client.commitTransaction(
      commitTransactionRequest,
      metadata,
      commitTransactionOptions,
    );
  }
}

module.exports = UpdateStatePromiseClient;
