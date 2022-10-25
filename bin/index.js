//get esm to compile the app.js file, allowing us to use esm import and export
require = require('esm')(module);
module.exports = require('../app.js');
