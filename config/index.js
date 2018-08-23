const config = require('dotenv');

config.config();

module.exports = {
    port: process.env.PORT || 3000,
    taxify_link: process.env.TAXIFY_LINK,
    taxify_email: process.env.TAXIFY_EMAIL,
    taxify_password: process.env.TAXIFY_PASSWORD
}