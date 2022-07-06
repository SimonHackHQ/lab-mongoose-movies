const express   = require('express');
const router    = express.Router();
const Celebrity = require("../models/celebrity");

// List all celebrities
router.get("/", (req, res, next) => {
    Celebrity
        .find()
        .then(celebritiesFromDB => {
            console.log("Successfuly retrieved data from DB: ", celebritiesFromDB);
            res.render("celebrities/index", { celebrities: celebritiesFromDB });
        })
        .catch(err => console.log(err));
});

// Actual route to render new celebrity form
router.get("/new", (req, res, next) => {
    res.render("celebrities/new");
});

router.post("/:id/delete", (req, res, next) => {    // ⚠️ May be more efficient with findByIdAndDelete
    Celebrity
        .findByIdAndDelete(req.params.id)
        //.deleteOne({ _id: req.params.id })
        .then(() => {
            console.log("Successfuly deleted celebrity!");
            res.redirect("/celebrities");
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

router.get("/:id/edit", (req, res, next) => {
    Celebrity
        .findById(req.params.id)
        .then(celebrityFromDB => {
            res.render("celebrities/edit", celebrityFromDB);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

// Get details about a given celebrity (identified by its DB id)
router.get("/:id", (req, res, next) => {
    Celebrity
        .findById(req.params.id)
        .then(celebrityFromDB => {
            res.render("celebrities/show", celebrityFromDB);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

router.post("/:id", (req, res, next) => {
    Celebrity
    .findByIdAndUpdate(req.params.id, {
        name:           req.body.name,
        occupation:     req.body.occupation,
        catchPhrase:    req.body.catchPhrase
    })
    .then(() => {
        res.redirect(`/celebrities/${req.params.id}`);
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
});

// POST route to process new celebrity form data
router.post("/", (req, res, next) => {
    Celebrity
        .create({
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        })
        .then(() => { 
            console.log("Successfully added a new celebrity in database!");
            res.redirect("/celebrities"); /// 302 Location: /celebrities
        })
        .catch(err => {
            if (err.code === 11000) {
                console.log("if");
                res.render("celebrities/new", { message: "Oups, celebrity already existing in DB" });
                return;
            }
            console.log(err);
            next(err);
        });
});

module.exports = router;
