var events  = require('events');
var debug   = require('debug')('mockrpc');
var util    = require('util');



function random (low, high) {
    return parseInt(Math.random() * (high - low) + low);
}

function mocksocket() {

    debug("new instance");


    this.address_ = "127.0.0.1";
    this.port = random(1, 9999);

    debug("new instance port: %s", this.port);

    events.EventEmitter.call(this);


    this.address = function () {
        return {
            port: this.port,
            address: this.address_
        };
    };


    this.send = function (arg1, arg2, arg3, arg4, arg5, arg6) {
    
        debug("send method");
        this.emit('message', arg1, { address: arg5, port: arg4});

        if(arg6) {
            arg6();
        }
    };


    this.close = function () {
        this.emit('close');
    };

    /**/

    this.bind = function (port, cb) {
    
        debug("bind method");


        if(cb) {
            cb();
        }
    };



    var scope = this;
    setTimeout(function ()  {
        scope.emit('listening');
    }, 2000);
}

mocksocket.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = mocksocket;
