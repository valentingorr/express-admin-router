const slugify = require("slugify");

const clientManager = require("../modules/clients.js");

const express = require("express");

module.exports = (parameters, panels) => {

	const routes = panels.routes.map(route => {
		return {
			...route,
			slug: slugify(route.title, {
				lower: true,
				trim: true,
				replacement: "-"
			})
		}
	});

	const router = express.Router();
	
	router.get("/", (req, res) => {
		res.render("panel", {
			parameters,
			routes
		});
	});

	return router;
};