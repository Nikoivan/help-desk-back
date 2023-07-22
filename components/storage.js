class Storage {
  constructor() {
    this.storages = [];
  }

  allTickets() {
    return this.storages;
  }

  add(element) {
    this.storages.push(element);
  }

  getById(id) {
    return this.storages.find((el) => el.id === id);
  }

  removeById(id) {
    const ticket = this.storages.find((el) => el.id === id);
    if (!ticket) {
      return { err: "Ticket with this id isn't found" };
    }

    this.storages = this.storages.filter((el) => el.id !== id);

    return { type: "deleted", id };
  }

  get show() {
    return this.storages;
  }
}

exports.Storage = Storage;
