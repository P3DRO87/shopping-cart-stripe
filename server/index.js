const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();
const cors = require("cors");
const { join } = require("path");

const { PORT: CURRENT_PORT, STRIPE_SECRET_KEY } = process.env;

const app = express();

const stripe = new Stripe(STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
   res.send({ msg: "Api ready" });
});

app.post("/api/checkout", async (req, res) => {
   try {
      const { amount, id } = req.body;

      if (!id) return res.status(400).json({ msg: "Payment id required" });

      if (!amount) return res.status(402).json({ msg: "Payment required" });

      const paymentConfig = { amount, currency: "USD", payment_method: id };

      await stripe.paymentIntents.create({ ...paymentConfig, confirm: true });

      res.json({ msg: "Payment successfully" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

app.get("*", (req, res) => {
   res.sendFile(join(__dirname, "../client/dist/index.html"));
});

app.listen(CURRENT_PORT, () => console.log(`server running at port ${CURRENT_PORT}`));
