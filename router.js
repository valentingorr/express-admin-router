const path = require("path");

const slugify = require('slugify');

const express = require("express");
const session = require("express-session");

const clientManager = require("./modules/clients.js");

module.exports = (app, parameters) => panels => {
	
	const router = express();

	router.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	router.use(session({
		cookieName: "admin",
		secret: parameters.secret,
		resave: false,
		saveUninitialized: true,
		httpOnly: true,
		secure: true,
		ephemeral: true,
		expires: new Date(Date.now() + (60 * 60 * 1000)),
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000
	    }
	}));

	router.set("view engine", "ejs");
	router.set("views", path.resolve(__dirname, "./public/"));
	app.use(express.static(path.resolve(__dirname, "./public/admin-assets/")));

	router.use((req, res, next) => {
		req.adminClient = clientManager().session(req.sessionID);
		if(parameters.authenticate !== false && req.adminClient.user === false && req.url !== "/login") {
			if(req.method === "GET") res.status(301).redirect(`${parameters.route}/login`);
			return next();
		}
		return next();
	});

	router.use("/login", require("./routes/login.js")(parameters));
	router.use("/panel", require("./routes/panel.js")(parameters, panels));

	app.use(parameters.route, router);
};