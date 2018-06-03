const expect = require('expect');
const {
  Users
} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 111,
      name: 'One',
      room: 'Room One'
    }, {
      id: 222,
      name: 'Two',
      room: 'Room Two'
    }, {
      id: 333,
      name: 'Tiny One',
      room: 'Room One'
    }];

  });
  it('should add user', () => {
    let users = new Users();
    let stored = users.addUser('1', '2', 3);
    expect(stored).toEqual([{
      id: '1',
      name: '2',
      room: 3
    }]);
  });
  it('should return users at Room One', () => {
    let stored = users.getUserList('Room One');
    expect(stored).toEqual(['One', 'Tiny One']);
  });
  it('should return users at Room Two', () => {
    let stored = users.getUserList('Room Two');
    expect(stored).toEqual(['Two']);
  });
  it('should return userOne', () => {
    let u = users.getUser(111);
    expect(u).toEqual({
      id: 111,
      name: 'One',
      room: 'Room One'
    });
  });
  it('should return Empry User', () => {
    let u = users.getUser(1234546);
    expect(u).toBeFalsy();
  });
  it('should remove user', () => {
    let u = users.removeUser(111);
    expect(u).toEqual({
      id: 111,
      name: 'One',
      room: 'Room One'
    });
    it('should not remove Empry User', () => {
      let u = users.removeUser(1234546);
      expect(u).toBeFalsy();
    });
  })
});