const expect = require('expect');
const {generateMessage,generateLocationMessage } = require('./message.js');
describe('generateMessage', () => {
  it('should create a valid message', () => {
    let from = 'from';
    let text = 'this is text';
    let message = generateMessage(from, text);
    expect(message)
      .toBeTruthy();
    expect(message.from).toEqual(from);
    expect(message.text).toEqual(text);
    expect(message.createAt).toBeGreaterThan(100000);
  });
});

describe('generateLocationMessage', () => {
  it('should create a valid Location message', () => {
    let from = 'from';

    let message = generateLocationMessage(from, 1,1);
    expect(message)
      .toBeTruthy();
    expect(message.from).toEqual(from);
    expect(message.url).toBeTruthy();
    expect(message.createAt).toBeGreaterThan(100000);
  });
});