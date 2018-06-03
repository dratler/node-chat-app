const expect = require('expect');
const {isRealString} = require('./validation');
describe('isReal(String', () => {
  it('should detect empty string', () => {
    expect(isRealString('')).toBe(false);
    expect(isRealString(undefined)).toBe(false);
    expect(isRealString('    ')).toBe(false);
  });
  it('should detect full string', () => {
    expect(isRealString('  Hi  ')).toBe(true);
  });
});
