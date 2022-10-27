import { ObjectToArrayOfKeysPipe } from './object-to-array-of-keys.pipe';

describe('ObjectToArrayOfKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectToArrayOfKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
