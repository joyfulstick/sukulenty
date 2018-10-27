const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const makeEmail = user => message => `
  <article style="
    border: 1px solid grey;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px; 
  ">
    <h2>Cześć ${user}!</h2>
    <p>${message}</p>

    <p>Michał</p>
  </article>
`

exports.transport = transport
exports.makeEmail = makeEmail
