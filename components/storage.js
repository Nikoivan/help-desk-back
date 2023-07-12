class Storage {
  constructor() {
    this.storage = [];
  }

  allTickets() {
    return this.storage;
  }

  add(element) {
    this.storage.push(element);
  }

  getById(id) {
    return this.storage.find((el) => el.getId() === id);
  }

  removeById(id) {
    const ticket = this.storage.find((el) => el.id === id);
    console.log(ticket);
    if (!ticket) {
      return null;
    }
    this.storage = this.storage.filter((el) => {
      el.id !== id;
    });
    return { status: "deleted" };
  }

  get show() {
    return this.storage;
  }
}

exports.Storage = Storage;
