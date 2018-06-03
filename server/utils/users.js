// addUser(id, name, room){};
// removeUser(id){};
//getUser(id){};
// getUserList(room){};

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    let user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return this.users;
  }
  removeUser(id) {
    let foundUser = this.getUser(id);
    if (foundUser) {
      let usersToStore = this.users.filter((u) => u !== foundUser);
      this.users = usersToStore;
    }
    return foundUser;
  }
  getUser(id) {
    let singleUser = this.users.filter((u) =>  u.id === id);
    return singleUser [0];
  }
  getUserList(room) {
    let users = this.users.filter((user) => user.room === room);
    let nameArr = users.map((user) => user.name);
    return nameArr;
  }
}

module.exports = {
  Users
};