class Controller {
  constructor(Storage, Item) {
    this.storage = new Storage();
    this.ItemType = Item;
  }

  allTickets() {
    const arr = [];
    this.storage.allTickets().forEach((el) => {
      const item = el.data;
      arr.push(item);
    });
    return arr;
  }

  createTicket(data) {
    data.status = "new";
    const ticket = new this.ItemType(data);
    this.storage.add(ticket);

    if (!ticket) {
      return { err: "Error in method createTicket" };
    }

    return { type: "create", ticket: ticket.data };
  }

  ticketById(id) {
    const ticket = this.storage.getById(id);
    if (!ticket) {
      return { err: "Тикета с данным id не существует" };
    }
    return ticket.description;
  }

  deleteById(id) {
    const result = this.storage.removeById(id);

    if (!result) {
      return { err: "Тикета с данным id не существует" };
    }

    return result;
  }

  updateById(id, data) {
    const ticket = this.storage.getById(id);
    if (!ticket) {
      return { err: "Тикета с данным id не существует" };
    }

    let result;
    if (!data.status) {
      result = ticket.update(data);
    } else {
      result = ticket.changeStatus(data.status);
    }

    return result;
  }
}

exports.Controller = Controller;
