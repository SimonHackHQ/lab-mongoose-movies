const express   = require('express');
const router    = express.Router();
const Celebrity = require("../models/celebrity");

router.get("/", (request, response, next) => {
    Celebrity
        .find()
        .then(celebritiesFromDB => {
            console.log("Successfuly retrieved data from DB: ", celebritiesFromDB);
            response.render("celebrities/index", { celebrities: celebritiesFromDB });
        })
        .catch(error => console.log(error));
});

module.exports = router;
