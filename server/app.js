const path = require("path");

// EXPRESS
const express = require("express");
const app = express();
const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

// CONFIG
process.env["NODE_CONFIG_DIR"] = path.resolve("server", "config");
const cfg = require("config");
const config = {
    appPort: cfg.has("appPort") ? cfg.get("appPort") : 5003
}

// Bruteforce security
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 sec
    max: 4,
    message: { message: "Попробуйте позже" }
});``
app.set('trust proxy', 1);
app.use("/api/", apiLimiter);

app.use(express.json({ extended: true }));
app.use(helmet());

// ROUTES
app.use("/api/mail", require("./routes/mail.js"));

async function start() {
    try {
        // LISTEN
        app.listen(config.appPort, () => {
            console.log("\x1b[32m\x1b[1m%s\x1b[0m", `Application started on port ${config.appPort}`);
        })
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}
start();
