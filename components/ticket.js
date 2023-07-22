const moment = require("moment");

class Ticket {
  constructor(data) {
    const { id, name, status, description } = data;
    this.id = id;
    this.name = name;
    this.status = status;
    this._description = description;
    this.created = `${moment().format(
      "DD-MM-YY"
    )} ${moment().hour()}:${moment().minutes()}`;
  }

  get description() {
    return {
      type: "description",
      name: this.name,
      description: this._description,
      id: this.id,
    };
  }

  get data() {
    return {
      type: "ticket",
      id: this.id,
      name: this.name,
      status: this.status,
      created: this.created,
    };
  }

  changeStatus(status) {
    this.status = status;
    return { type: "status", status: "done", id: this.id };
  }

  update(data) {
    const { name, description } = data;
    if (name !== this.name) {
      this.name = name;
    }
    if (description !== this._description) {
      this._description = description;
    }

    return { type: "update", id: this.id, ticket: this.data };
  }

  getId() {
    return this.id;
  }
}

exports.Ticket = Ticket;
