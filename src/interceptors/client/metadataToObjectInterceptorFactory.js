const grpc = require('grpc');

const { InterceptingCall } = grpc;

/**
 * Client-side metadata -> Object interceptor (factory)
 *
 * @param {isObject} isObject
 * @param {convertObjectToMetadata} convertObjectToMetadata
 *
 * @returns {conversionInterceptor}
 */
function metadataToObjectInterceptorFactory(isObject, convertObjectToMetadata) {
  /**
   * Client-side metadata -> Object interceptor
   *
   * @param {Object} options
   * @param {module:grpc.InterceptingCall} nextCall
   *
   * @returns {module:grpc.InterceptingCall}
   */
  function conversionInterceptor(options, nextCall) {
    const methods = {
      start(metadata, listener, nextStart) {
        if (!isObject(metadata)) {
          throw new Error('metadata is not an object');
        }

        nextStart(convertObjectToMetadata(metadata), listener, nextStart);
      },
    };
    return new InterceptingCall(nextCall(options), methods);
  }

  return conversionInterceptor;
}

module.exports = metadataToObjectInterceptorFactory;
