declare module "summer" {
    /** user */
    export namespace APIs.user {
        /** 获取用户信息 */
        export function getUserInfo (
            data?:{

            }
        ): Promise<{
                data?: {
                    /** 账号名 */
                    account?: string;
                    /** 头像 */
                    avatar?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 生日 */
                    birthday?: string;
                    id?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** 微信账号 */
                    wechat?: string;
                    /** 真实姓名 */
                    name?: string;
                    /** 顶部简介背景 */
                    banner?: string;
                    /** 二维码 */
                    qr_code?: string;
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 修改用户信息 */
        export function postUserInfo (
            data?:{
                data?: {
                    qq?: string;
                    taobao_account?: string;
                    account?: string;
                    banner?: string;
                    name?: string;
                    avatar?: string;
                    birthday?: string;
                    id?: string;
                };
            }
        ): Promise<{
                meta?: {
                    /** 返回信息 */
                    msg?: string;
                    /** 状态码 */
                    code?: number;
                };
                /** 返回数据 */
                data?: {

                };
            }>;
    }
    /** 采购单 */
    export namespace APIs.order {
        /** 获取采购单列表 */
        export function getOrderList (
            data?:{
                /** 采购单状态 */
                status?: number;
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    results?: {
                        image?: string;
                        title?: string;
                        /** 完成数量 */
                        completed?: number;
                        u_id?: string;
                        /** 城市 */
                        city?: string;
                    }[];
                };
            }>;
        /** 获取采购单信息 */
        export function getOrderInfo (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        /** 采购单内单条id */
                        u_id?: string;
                        /** 单条标题 */
                        title?: string;
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
    }
    /** 市场数据相关接口 */
    export namespace APIs.market {
        /** 获取 店铺/档口 信息 */
        export function getShopList (
            data?:{
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
                /** 城市(id) */
                city?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        u_id?: string;
                        /** 档口名称 */
                        title?: string;
                        /** 分类 */
                        category?: string;
                        /** 档口简介 */
                        description?: string;
                        /** 标签 */
                        tags?: string[];
                        image?: string;
                        /** 主营 */
                        main?: string;
                        price?: number;
                        /** 提供服务 */
                        service?: string[];
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 获取店铺/档口信息 */
        export function getShopInfo (
            data?:{
                id?: string;
            }
        ): Promise<{
                data?: {
                    /** 收藏 */
                    fav?: boolean;
                    /** 联系方式 */
                    contact?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 二维码名片 */
                    qr_code?: string;
                    /** 主营 */
                    main?: string;
                    /** 地区 */
                    area?: string;
                    /** 服务 */
                    service?: string[];
                    /** banner图 */
                    banner?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** 档口头像 */
                    avatar?: string;
                    /** 档口名称 */
                    title?: string;
                    /** 分类 */
                    category?: string;
                    u_id?: string;
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取 店铺/档口 商品 */
        export function getShopGoodsList (
            data?:{
                u_id?: string;
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    results?: {
                        u_id?: string;
                        price?: number;
                        image?: string;
                        /** 宝贝名称 */
                        title?: string;
                    }[];
                };
            }>;
        /** 收藏档口/店铺 */
        export function postShopFavAdd (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {

                };
            }>;
        /** 移除收藏档口/店铺 */
        export function postShopFavRemove (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                data?: {

                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
    }
    /** 用户账号相关接口 */
    export namespace APIs.account {
        /** 用户注销登录 */
        export function getLogout (
            data?:{

            }
        ): Promise<{
                data?: {

                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 用户登录接口 */
        export function postLogin (
            data?:{
                /** 账号 */
                account?: string;
                /** 密码 */
                password?: string;
            }
        ): Promise<{
                meta?: {
                    /** 状态码 */
                    code?: number;
                    /** 返回信息 */
                    msg?: string;
                };
                /** 返回数据 */
                data?: {
                    token?: string;
                };
            }>;
        /** 修改账号密码 */
        export function postPasswordReset (
            data?:{
                /** 新密码 */
                password?: string;
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {

                };
            }>;
        /** 注册新用户 */
        export function postRegister (
            data?:{
                /** 密码 */
                password?: string;
                /** 注册手机号 */
                mobile?: number;
            }
        ): Promise<{
                data?: {

                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取短信验证码 */
        export function getIdentificationCode (
            data?:{
                /** 用户手机号码 */
                mobile?: string;
            }
        ): Promise<{
                data?: {

                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 提交短信验证码 */
        export function postIdentificationCode (
            data?:{
                /** 验证码类型(重设密码 注册) */
                type?: number;
                /** 验证码 */
                code?: number;
            }
        ): Promise<{
                data?: {
                    /** 验证结果(1: 成功, 0: 失败) */
                    status?: number;
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
    }
    /** 商品/宝贝 模块 */
    export namespace APIs.goods {
        /** 获取 商品/宝贝 信息 */
        export function getGoodsInfo (
            data?:{
                id?: string;
            }
        ): Promise<{
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    u_id?: string;
                    /** 所属店铺/档口(id) */
                    shop_id?: string;
                    /** 分类 */
                    category?: string;
                    /** 收藏 */
                    fav?: boolean;
                    /** 图片 */
                    banner?: string[];
                    /** 价格 */
                    price?: number;
                    /** 地区 */
                    area?: string;
                    /** 淘宝价格 */
                    taobao_price?: number;
                    /** 商品名称 */
                    title?: string;
                    /** 所属店铺/档口名 */
                    shop_name?: string;
                };
            }>;
        /** 获取  商品/宝贝 列表 */
        export function getGoodsList (
            data?:{
                u_id?: string;
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
            }
        ): Promise<{
                data?: {
                    results?: {
                        image?: string;
                        u_id?: string;
                        price?: number;
                        /** 宝贝名称 */
                        title?: string;
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 获取 商品/宝贝 图片 */
        export function getGoodsImages (
            data?:{
                u_id?: string;
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
            }
        ): Promise<{
                data?: {
                    results?: string[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 收藏 商品/宝贝 */
        export function postGoodsFavAdd (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {

                };
            }>;
        /** 移除收藏 商品/宝贝 */
        export function postGoodsFavRemove (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                data?: {

                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
    }
    /** home */
    export namespace APIs.home {
        /** 获取  首页广告 列表 */
        export function getAdvertList (
            data?:{

            }
        ): Promise<{
                data?: {
                    A3?: {
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                        list?: {
                            goods_id?: string;
                            title?: string;
                            description?: string;
                            main?: string;
                            price?: number;
                            service?: string[];
                            image?: string;
                            u_id?: string;
                            category?: string;
                            tags?: string[];
                        }[];
                    };
                    A1?: {
                        category?: string;
                        service?: string[];
                        tags?: string[];
                        description?: string;
                        price?: number;
                        u_id?: string;
                        image?: string;
                        main?: string;
                        title?: string;
                    }[];
                    A2?: {
                        list?: {
                            title?: string;
                            image?: string;
                            description?: string;
                            goods_id?: string;
                            price?: number;
                            category?: string;
                            service?: string[];
                            main?: string;
                            u_id?: string;
                            tags?: string[];
                        }[];
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                    };
                    A5?: {
                        list?: {
                            image?: string;
                            price?: number;
                            main?: string;
                            tags?: string[];
                            title?: string;
                            category?: string;
                            u_id?: string;
                            description?: string;
                            goods_id?: string;
                            service?: string[];
                        }[];
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                    }[];
                    A4?: {
                        list?: {
                            goods_id?: string;
                            description?: string;
                            u_id?: string;
                            main?: string;
                            tags?: string[];
                            category?: string;
                            image?: string;
                            price?: number;
                            service?: string[];
                            title?: string;
                        }[];
                        header?: {
                            image?: string;
                            shop_id?: string;
                        };
                    };
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
    }
    /** search */
    export namespace APIs.search {
        /** 获取 搜款式/商品列表 信息 */
        export function getSearchGoodsList (
            data?:{
                /** 城市(id) */
                city?: string;
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
            }
        ): Promise<{
                data?: {
                    results?: {
                        image?: string;
                        price?: number;
                        title?: string;
                        u_id?: string;
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
    }
}
