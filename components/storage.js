class Storage {
  constructor() {
    this.storage = [];
  }

  allTickets() {
    console.log(this.storage);
    return this.storage;
  }

  add(element) {
    this.storage.push(element);
  }

  getById(id) {
    const result = this.storage.find((el) => el.id === id);
    return result;
  }

  removeById(id) {
    const ticket = this.storage.find((el) => el.id === id);
    if (!ticket) {
      return { err: "Ticket with this id isn't found" };
    }

    this.storage = this.storage.filter((el) => {
      el.id !== id;
    });
    return { type: "deleted", id };
  }

  get show() {
    return this.storage;
  }
}

exports.Storage = Storage;
