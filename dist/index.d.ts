import { ClientOpts } from "redis";
export declare function createRedisClient(options?: ClientOpts): void;
/**
 * 同步获取redis中的值
 * @param {*} key
 * @param {*} default_value
 */
export declare function get_value_async(key: string, default_value: string): Promise<string | null>;
/**
 * 同步获取redis中的值
 * @param {*} key
 * @param {*} field
 * @param {*} default_value
 */
export declare function hget_value_async(key: string, field: string, default_value: string): Promise<string | null>;
/**
 * 同步设置值
 * @param {*} key
 * @param {*} value
 */
export declare function set_value_async(key: string, value: string): Promise<string | null>;
/**
 * 同步设置值
 * @param {*} key
 * @param {*} value
 */
export declare function hset_value_async(key: string, field: string, value: string): Promise<number | null>;
/**
 * 同步设置记录生命周期
 * @param {*} key
 * @param {*} time
 */
export declare function expire_async(key: string, time: number): Promise<number | null>;
/**
 * 同时设置时限记录
 * @param {*} key
 * @param {*} value
 * @param {*} time
 */
export declare function set_value_expire_async(key: string, value: string, time: number): Promise<number | null>;
/**
 * 删除
 * @param key
 * @returns
 */
export declare function del_value_async(key: string): Promise<null>;
