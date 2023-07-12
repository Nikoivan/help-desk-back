class Controller {
  constructor(Storage, Item) {
    this.storage = new Storage();
    this.ItemType = Item;
  }

  /*callback(settings) {
    console.log("callback 1");
    const { method, ...data } = settings;

    return this[method](data);
  }*/

  allTickets(data = null) {
    return this.storage.allTickets();
  }

  createTicket(data) {
    data.status = "new";
    const ticket = new this.ItemType(data);
    this.storage.add(ticket);
    console.log(this.storage.allTickets());

    return { status: "created" };
  }

  ticketById(id) {
    const result = this.storage.getById(id);
    if (!result) {
      return { err: "Тикета с данным id не существует" };
    }
    return result;
  }

  deleteById(id) {
    const result = this.storage.removeById(id);

    if (!result) {
      return { err: "Тикета с данным id не существует" };
    }
    console.log(this.storage.allTickets());
    return result;
  }

  updateById(id, data) {
    const ticket = this.storage.getById(id);
    console.log(ticket);
    if (!ticket) {
      return { err: "Тикета с данным id не существует" };
    }

    const result = ticket.update(data);
    if (result.err !== undefined) {
      return { err: result.err };
    }
    console.log(this.storage.allTickets());
    return result;
  }
}

exports.Controller = Controller;
