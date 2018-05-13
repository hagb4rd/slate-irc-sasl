/**
 * CAP REQ <reqs>
 *
 * @param {String} reqs
 * @api public
 */
var cap_req = function(reqs) {
    this.write('CAP REQ :' + reqs);
};

/**
 * CAP END
 *
 * @api public
 */
var cap_end = function() {
    this.write('CAP END');
};


/**
 * CAP plugin to emit "cap" events.
 *
 * @return {Function}
 * @api public
 */
module.exports = function () {
    return function (irc) {

        irc.cap_req = cap_req;
        irc.cap_end = cap_end;

        irc.on('data', function (msg) {
            if ('CAP' != msg.command) return;
            var params = msg.params.split(' ');
            var e = {};
            e.nick = params[0];
            e.command = params[1];
            e.capabilities = msg.trailing.split(' ');
            irc.emit('cap', e);
        });
    }
};
