const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Actor.belongsTo(Movie);
Movie.hasMany(Actor);

Director.belongsTo(Movie);
Movie.hasMany(Director);

Genre.belongsTo(Movie);
Movie.hasMany(Genre);

Actor.belongsToMany(Movie, {through: "ActorsMovie"});

Director.belongsToMany(Movie, {through: "DirectorsMovie"});

Genre.belongsToMany(Movie, {through: "GenresMovie"});



