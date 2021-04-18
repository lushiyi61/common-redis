import log4js from "common-log4js";
import { basename } from "path";
const logger = log4js.getLogger(basename(__filename));
///////////////////////////////////////////////////////
import { createClient, RedisClient } from "redis";

let client: RedisClient;

export function createRedisClient() {
    client = createClient();
};

/**
 * 同步获取redis中的值
 * @param {*} key 
 * @param {*} default_value 
 */
export function get_value_async(key: string, default_value: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        client.get(key, (err, rsp) => {
            if (err) {
                logger.error("REDIS ASYNC GET KEY ERROR:", err);
                resolve(default_value);
            }
            resolve(rsp);
        })
    })
}


/**
 * 同步设置值
 * @param {*} key
 * @param {*} value 
 */
export function set_value_async(key: string, value: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err, rsp) => {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            resolve(rsp);
        })
    })
}


/**
 * 同步设置记录生命周期
 * @param {*} key 
 * @param {*} time 
 */
export function expire_async(key: string, time: number): Promise<number | null> {
    return new Promise((resolve, reject) => {
        client.expire(key, time, (err, rsp) => {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            resolve(rsp)
        })
    });
}


/**
 * 同时设置时限记录
 * @param {*} key 
 * @param {*} value 
 * @param {*} time 
 */
export function set_value_expire_async(key: string, value: string, time: number): Promise<number | null> {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err, rsp) => {
            if (err) {
                logger.error("REDIS SET VALUE FAILED:", err);
                resolve(null);
            }
            client.expire(key, time, (err, rsp) => {
                if (err) {
                    logger.error("REDIS EXPIRE VALUE FAILED:", err);
                    resolve(null);
                }
                resolve(rsp);
            });
        });
    });
}