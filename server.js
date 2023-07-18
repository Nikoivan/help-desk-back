const http = require("http");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const uuid = require("uuid");

const { Controller } = require("./components/controller.js");
const { Storage } = require("./components/storage.js");
const { Ticket } = require("./components/ticket.js");

const tc = new Controller(Storage, Ticket);

const app = new Koa();

app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
  }),
);

app.use((ctx, next) => {
  if (ctx.request.method !== "OPTIONS") {
    next();
    return;
  }
  ctx.response.set("Access-Control-Allow-Origin", "*");
  ctx.response.set(
    "Access-Control-Allow-Methods",
    "DELETE, PUT, PATCH, GET, POST",
  );

  ctx.response.status = 204;
});

app.use((ctx, next) => {
  if (ctx.request.method === "POST" || ctx.request.method === "GET") {
    ctx.response.set("Access-Control-Allow-Origin", "*");

    try {
      const { method, id } = ctx.request.query;
      let result;

      if (ctx.request.method === "GET") {
        if (id) {
          result = tc[method](id);
        } else {
          result = tc[method]();
        }
      } else {
        const data = ctx.request.body;

        if (tc.allTickets().some((item) => item.name === data.name)) {
          ctx.response.status = 400;
          ctx.response.body = { err: "Ticket with this name exists" };

          return;
        }
        if (!id) {
          data.id = uuid.v4();
          result = tc[method](data);
        } else {
          result = tc[method](+id, data);
        }
      }

      ctx.response.body = result;

      ctx.response.status = 200;
    } catch (e) {
      console.log(`error ${e}`);
    }
  }

  next();
});

app.use((ctx, next) => {
  if (ctx.request.method !== "PUT") {
    next();
    return;
  }
  try {
    ctx.response.set("Access-Control-Allow-Origin", "*");
    const { method, id } = ctx.request.query;
    const data = ctx.request.body;

    if (tc.allTickets().every((item) => item.id !== id)) {
      ctx.response.status = 400;
      ctx.response.body = { err: "Ticket with it id don't exists" };
      next();
      return;
    }
    const result = tc[method](id, data);

    ctx.response.body = result;
    ctx.response.status = 200;
  } catch (e) {
    console.log(e);
  }

  next();
});

app.use((ctx, next) => {
  if (ctx.request.method !== "DELETE") {
    next();

    return;
  }

  try {
    const { method, id } = ctx.request.query;

    ctx.response.set("Access-Control-Allow-Origin", "*");
    if (tc.allTickets().some((item) => item.id !== id)) {
      ctx.response.status = 400;
      ctx.response.body = { err: "Ticket with it id don't exists" };
      next();
      return;
    }

    const result = tc[method](id);

    ctx.response.body = result;
    ctx.response.status = 200;
  } catch (e) {
    console.log(e);
  }

  next();
});

const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log("Server is listen " + port);
});
