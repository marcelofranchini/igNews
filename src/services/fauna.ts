import { Client } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNA_SECRET,
  //   domain: "db.fauna.com",
  //   // NOTE: Use the correct domain for your database's Region Group.
  //   port: 443,
  //   scheme: "https",
});
