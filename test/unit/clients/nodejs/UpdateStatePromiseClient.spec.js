const UpdateStatePromiseClient = require('../../../../clients/nodejs/UpdateStatePromiseClient');

describe('UpdateStatePromiseClient', () => {
  let updateStatePromiseClient;

  let request;
  let response;

  beforeEach(function beforeEach() {
    request = 'test request';
    response = 'test response';

    updateStatePromiseClient = new UpdateStatePromiseClient('localhost');
    updateStatePromiseClient.client = {
      startTransaction: this.sinon.stub().resolves(response),
      applyStateTransition: this.sinon.stub().resolves(response),
      commitTransaction: this.sinon.stub().resolves(response),
    };
  });

  describe('#startTransaction', () => {
    it('should starta transaction', async () => {
      const result = await updateStatePromiseClient.startTransaction(request);

      expect(result).to.equal(response);
      expect(updateStatePromiseClient.client.startTransaction).to.be.calledOnceWith(request);
    });

    it('should throw an error when metadata is not an object', async () => {
      try {
        updateStatePromiseClient.startTransaction({}, 'metadata');

        expect.fail('Error was not thrown');
      } catch (e) {
        expect(e.message).to.equal('metadata must be an object');
      }
    });
  });

  describe('#applyStateTransition', () => {
    it('should apply state transition', async () => {
      const result = await updateStatePromiseClient.applyStateTransition(request);

      expect(result).to.equal(response);
      expect(updateStatePromiseClient.client.applyStateTransition)
        .to.be.calledOnceWith(request);
    });

    it('should throw an error when metadata is not an object', async () => {
      try {
        updateStatePromiseClient.applyStateTransition({}, 'metadata');

        expect.fail('Error was not thrown');
      } catch (e) {
        expect(e.message).to.equal('metadata must be an object');
      }
    });
  });

  describe('#commitTransaction', () => {
    it('should commit a transaction', async () => {
      const result = await updateStatePromiseClient.commitTransaction(request);

      expect(result).to.equal(response);
      expect(updateStatePromiseClient.client.commitTransaction).to.be.calledOnceWith(request);
    });

    it('should throw an error when metadata is not an object', async () => {
      try {
        updateStatePromiseClient.commitTransaction({}, 'metadata');

        expect.fail('Error was not thrown');
      } catch (e) {
        expect(e.message).to.equal('metadata must be an object');
      }
    });
  });
});
