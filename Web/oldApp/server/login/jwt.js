const expressJwt = require("express-jwt");
const secretKey = require('./secretKey.json');

module.exports = jwt;

function jwt() {
    // a secret key
    const secret = secretKey.secretKey; // secretKey.secretKey;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // diese Routen können auch ohne eingeloggt zu sein aufgerufen werden.
            // werden diese Routen aufgerufen, so wird der Token nicht in dem req Objekt angehängt.
            // Für Interessierte: Dies kann auch mit regular expressions gelöst werden.
            "/api/user/auth",
            "/"
        ],
        ext: [
            "png","jpg","css", "js", "woff2", "woff", "ico", "ttf", "html", "map"
        ]
    });

}

async function isRevoked(req, payload, done) {
/*    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }*/

    done();
}