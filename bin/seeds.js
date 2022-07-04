const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const celebrities = [
    {
        name:           "Jean-Michel Trogneux",
        occupation:     "Première Dame",
        catchPhrase:    "Qui vole un oeuf, vole un oeuf."
    },
    {
        name:           "Didier Raoult",
        occupation:     "Barbu antivax",
        catchPhrase:    "Quand on attaque l'Empire, l'Empire contre-attaque."
    },
    {
        name:           "Damien Abad",
        occupation:     "Don Juan",
        catchPhrase:    "Quand la justice est au service de certains hommes seulement, alors, elle éclabousse tous les hommes."
    }
];

mongoose
    .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
    .then(() => console.log("Connected"))
    .catch(error => console.log(error));

Celebrity
    .create(celebrities)
    .then(() => console.log("Initial data inserted in local db"))
    .catch(error => console.log(error));