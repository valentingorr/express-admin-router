module.exports = (app, p) => {

	const parameters = {
		route: "/admin",
		authenticate: false,
		...p
	};

	return {
		adminRouter: require("./router.js")(app, parameters)
	}
}