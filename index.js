require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const nodemailer = require("nodemailer");
const auth = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/send", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const info = await transporter.sendMail({
      from: "peworld08@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
    });

    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const info = await transporter.sendMail({
      from: "peworld08@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Login detected", // Subject line
      text: `Hai, kami telah mendeteksi akun anda telah login pada tanggal ${
        new Date().getDate()
      }-${new Date().getMonth()}-${new Date().getFullYear()}`, // plain text body
    });

    auth.push(email);

    res.send(info);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
