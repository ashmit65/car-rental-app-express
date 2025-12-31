const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true });

// export as named property so destructuring works in routes
module.exports = { encoder };
