var events  = require('events');
var debug   = require('debug')('mockrpc');
var util    = require('util');

var EventEmitter = require('events').EventEmitter;


function random (low, high) {
    return parseInt(Math.random() * (high - low) + low);
}

function mocksocket() {

    debug("new instance");


    this.address_ = "127.0.0.1";
    this.port = random(1, 9999);
    this.closed = false;

    debug("new instance port: %s", this.port);

    events.EventEmitter.call(this);


    this.address = function () {
        return {
            port: this.port,
            address: this.address_
        };
    };


    this.send = function (arg1, arg2, arg3, arg4, arg5, arg6) {
        this.emit('send', arg1, arg2, arg3, arg4, arg5, arg6);
    };


    this.close = function () {
        this.emit('close');
    };

    /**/

    this.bind = function (port, cb) {
        cb();
    };



    this.emit('listening');
}

util.inherits(mocksocket, EventEmitter);

//var freeport = function () {
//    this.port = 9999;
//};

mocksocket.prototype.__proto__ = events.EventEmitter.prototype;


//exports.freeport = new freeport();
module.exports = mocksocket;
