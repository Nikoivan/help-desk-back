const moment = require("moment");

class Ticket {
  constructor(data) {
    const { id, name, status, description } = data;
    this.id = id;
    this.name = name;
    this.status = status;
    this.description = description;
    this.timeStamp = moment().format("YYYY-MM-DD");
  }

  update(data) {
    const { name, description } = data;
    if (name !== this.name) {
      this.name = name;
    }
    if (description !== this.description) {
      this.description = description;
    }

    return { status: updated };
  }

  getId() {
    return this.id;
  }

  remove() {
    this.remove();
  }
}

exports.Ticket = Ticket;
