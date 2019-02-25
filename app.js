// require weather module
const app = require('./weather.js');
// get arguments and join them together
const arg = process.argv.slice(2).join(' ');
// run the module
app.get(arg);