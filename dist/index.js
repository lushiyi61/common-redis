"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del_value_async = exports.set_value_expire_async = exports.expire_async = exports.hset_value_async = exports.set_value_async = exports.hget_value_async = exports.get_value_async = exports.createRedisClient = void 0;
var common_log4js_1 = require("common-log4js");
var path_1 = require("path");
var logger = common_log4js_1.default.getLogger(path_1.basename(__filename));
///////////////////////////////////////////////////////
var redis_1 = require("redis");
var client;
function createRedisClient(options) {
    client = redis_1.createClient(options);
}
exports.createRedisClient = createRedisClient;
;
/**
 * 同步获取redis中的值
 * @param {*} key
 * @param {*} default_value
 */
function get_value_async(key, default_value) {
    return new Promise(function (resolve, reject) {
        client.get(key, function (err, rsp) {
            if (err) {
                logger.error("REDIS ASYNC GET KEY ERROR:", err);
                resolve(default_value);
            }
            resolve(rsp);
        });
    });
}
exports.get_value_async = get_value_async;
/**
 * 同步获取redis中的值
 * @param {*} key
 * @param {*} field
 * @param {*} default_value
 */
function hget_value_async(key, field, default_value) {
    return new Promise(function (resolve, reject) {
        client.hget(key, field, function (err, rsp) {
            if (err) {
                logger.error("REDIS ASYNC HGET KEY ERROR:", err);
                resolve(default_value);
            }
            resolve(rsp);
        });
    });
}
exports.hget_value_async = hget_value_async;
/**
 * 同步设置值
 * @param {*} key
 * @param {*} value
 */
function set_value_async(key, value) {
    return new Promise(function (resolve, reject) {
        client.set(key, value, function (err, rsp) {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            resolve(rsp);
        });
    });
}
exports.set_value_async = set_value_async;
/**
 * 同步设置值
 * @param {*} key
 * @param {*} value
 */
function hset_value_async(key, field, value) {
    return new Promise(function (resolve, reject) {
        client.hset(key, field, value, function (err, rsp) {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            resolve(rsp);
        });
    });
}
exports.hset_value_async = hset_value_async;
/**
 * 同步设置记录生命周期
 * @param {*} key
 * @param {*} time
 */
function expire_async(key, time) {
    return new Promise(function (resolve, reject) {
        client.expire(key, time, function (err, rsp) {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            resolve(rsp);
        });
    });
}
exports.expire_async = expire_async;
/**
 * 同时设置时限记录
 * @param {*} key
 * @param {*} value
 * @param {*} time
 */
function set_value_expire_async(key, value, time) {
    return new Promise(function (resolve, reject) {
        client.set(key, value, function (err, rsp) {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            client.expire(key, time, function (err, rsp) {
                if (err) {
                    logger.error("REDIS EXPIRE VALUE FAILED:", err);
                    resolve(null);
                }
                resolve(rsp);
            });
        });
    });
}
exports.set_value_expire_async = set_value_expire_async;
/**
 * 删除
 * @param key
 * @returns
 */
function del_value_async(key) {
    return new Promise(function (resolve, reject) {
        client.del(key, function (err, rsp) {
            if (err) {
                logger.error("REDIS DEL VALUE FAILED:", err);
                resolve(null);
            }
        });
    });
}
exports.del_value_async = del_value_async;
