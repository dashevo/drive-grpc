const path = require('path');
const grpc = require('grpc');
const { promisify } = require('util');

const {
  loadPackageDefinition,
  utils: {
    isObject,
    convertObjectToMetadata,
  },
  client: {
    interceptors: {
      jsonToProtobufInterceptorFactory,
    },
    converters: {
      jsonToProtobufFactory,
      protobufToJsonFactory,
    },
  },
} = require('@dashevo/grpc-common');

const {
  org: {
    dash: {
      platform: {
        drive: {
          v0: {
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

const protoPath = path.join(__dirname, '../protos/update_state.proto');

const {
  UpdateState: UpdateStateNodeJSClient,
} = loadPackageDefinition(protoPath, 'org.dash.platform.drive.v0');

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
