/**
 * Module dependencies.
 */

//var Emitter = require('events').EventEmitter;
var debug = require('debug')('slate-irc');
//var Parser = require('slate-irc-parser');
//var replies = require('irc-replies');

/**
 * SASL AUTHENTICATE CAP plugins.
 */

var authenticate = require('./lib/plugins/authenticate');
var cap = require('./lib/plugins/cap');
var rplloggedin = require('./lib/plugins/rplloggedin');
var rplsaslsuccess = require('./lib/plugins/rplsaslsuccess');




/**
 * SASL AUTHENTICATE CAP plugins.
 *
 * @return {Function}
 * @api public
 */
module.exports = function () {
    return function (irc) {

      irc.write = function(str, fn) {
        debug('write %s', str);
        irc.stream.write(str + '\r\n', fn);	   
      };

      irc.use(authenticate());
      irc.use(cap());
      irc.use(disconnect());
      irc.use(rplloggedin());
      irc.use(rplsaslsuccess());  
  
    };
};