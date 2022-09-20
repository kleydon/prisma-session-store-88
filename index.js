import express from "express";
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';

const app = express();

const store = new PrismaSessionStore(
  new PrismaClient(),
  {
    checkPeriod: 2 * 60 * 1000,  //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }
)

let resave = true;
// Removing the touch method AND disabling resave also fixes the issue
// delete store.touch;
// resave = false;

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave,
    saveUninitialized: true,
    store
  })
);

// Move this right before the express-session middleware setup for
// the problem to go away
app.use("/public", express.static("./public"));




app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html")

  return res.send(`
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="public/example1.css" />
    <link rel="stylesheet" href="public/example2.css" />
    <link rel="stylesheet" href="public/example3.css" />
    <link rel="stylesheet" href="public/example4.css" />
    <link rel="stylesheet" href="public/example5.css" />
    <link rel="stylesheet" href="public/example6.css" />
  </head>
  <body>
    Demo for <a href="https://github.com/kleydon/prisma-session-store/issues/88#issuecomment-1251712853">this issue</a>
  </body>
  </html>
  `)

});


app.listen(3000)
