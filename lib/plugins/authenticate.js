/**
 * AUTHENTICATE <msg>
 *
 * @param {String} msg
 * @api public
 */
var authenticate = function(msg) {
    this.write('AUTHENTICATE ' + msg)
};

/**
 * AUTHENTICATE base64(<username>\0<username>\0<password>)
 *
 * @param {String} username
 * @param {String} password
 * @api public
 */
var authenticate64 = function(username, password) {
    var b = new Buffer(username + "\0" + username + "\0" + password, 'utf8');
    var b64 = b.toString('base64');
    this.write('AUTHENTICATE ' + b64)
};


/**
 * AUTHENTICATE plugin to emit "authenticate" events.
 *
 * @return {Function}
 * @api public
 */

module.exports = function () {
    return function (irc) {

        irc.authenticate = authenticate;
        irc.authenticate64 = authenticate64;

        irc.on('data', function (msg) {
            if ('AUTHENTICATE' != msg.command) return;
            var e = {};
            e.message = msg.params;
            irc.emit('authenticate', e);
        });
    }
};
