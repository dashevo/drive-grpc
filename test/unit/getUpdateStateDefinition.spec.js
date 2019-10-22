const getUpdateStateDefinition = require('../../lib/getUpdateStateDefinition');

describe('getUpdateStateDefinition', () => {
  it('should return UpdateState definition', () => {
    const definition = getUpdateStateDefinition();

    expect(definition).to.be.an('function');
    expect(definition).to.have.property('service');

    expect(definition.service).to.have.property('startTransaction');
    expect(definition.service.startTransaction.path).to.equal(
      '/org.dash.platform.drive.v0.UpdateState/startTransaction',
    );

    expect(definition.service).to.have.property('applyStateTransition');
    expect(definition.service.applyStateTransition.path).to.equal(
      '/org.dash.platform.drive.v0.UpdateState/applyStateTransition',
    );

    expect(definition.service).to.have.property('commitTransaction');
    expect(definition.service.commitTransaction.path).to.equal(
      '/org.dash.platform.drive.v0.UpdateState/commitTransaction',
    );
  });
});
