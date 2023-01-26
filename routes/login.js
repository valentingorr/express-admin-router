const clientManager = require("../modules/clients.js");

const express = require("express");
const router = express.Router();

module.exports = parameters => {
	router.use((req, res, next) => {
		if(parameters.authenticate === false) {
			res.status(301).redirect(parameters.route);
			return next();
		}
		return next();
	})

	router.get("/", (req, res) => res.status(200).render("login", { parameters, message: false, error: false }));
	router.post("/", (req, res) => {
		new Promise(async (resolve, reject) => {
			if(!(["username", "password"].map(key => {
				return Object.keys(req.body).includes(key);
			}).reduce((c, a) => c && a))) return reject({
				type: "error",
				text: "you must fill all the fields"
			});
			const authentication = await parameters.authenticate(req.body.username, req.body.password);
			if(authentication.granted === true) return resolve(authentication.user);
			else return reject(authentication.message);
			
			return reject({
				type: "error",
				text: "server internal error, try later."
			});
		}).then(user => {
			clientManager().session(req.sessionID).update(user);
			res.status(301).redirect(`${parameters.route}/panel`);
		}).catch(message => {
			res.status(200).render("login", { parameters, message, error: false });
		});
	});

	return router;
};