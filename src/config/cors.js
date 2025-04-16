export const corsOptions = {
    origin: function (origin, callback) {
        return callback(null, true)
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    // Allow cookie from client
    // credentials: true
}
