declare module "summer" {
    /** user */
    export namespace APIs.user {
        /** 获取用户信息 */
        export function getUserInfo (
            data?:{

            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    id?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 真实姓名 */
                    name?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** 微信账号 */
                    wechat?: string;
                    /** 头像 */
                    avatar?: string;
                    /** 账号名 */
                    account?: string;
                    /** 二维码 */
                    qr_code?: string;
                    /** 顶部简介背景 */
                    banner?: string;
                    /** 生日 */
                    birthday?: string;
                };
            }>;
        /** 修改用户信息 */
        export function postUserInfo (
            data?:{
                data?: {
                    banner?: string;
                    birthday?: string;
                    name?: string;
                    taobao_account?: string;
                    id?: string;
                    qq?: string;
                    account?: string;
                    avatar?: string;
                };
            }
        ): Promise<{
                /** 返回数据 */
                data?: {

                };
                meta?: {
                    /** 状态码 */
                    code?: number;
                    /** 返回信息 */
                    msg?: string;
                };
            }>;
    }
    /** 采购单 */
    export namespace APIs.order {
        /** 获取采购单列表 */
        export function getOrderList (
            data?:{
                /** 请求信息 */
                block_info?: {
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                    /** 当前列表请求index */
                    index?: number;
                };
                /** 采购单状态 */
                status?: number;
            }
        ): Promise<{
                data?: {
                    results?: {
                        /** 城市 */
                        city?: string;
                        image?: string;
                        u_id?: string;
                        title?: string;
                        /** 完成数量 */
                        completed?: number;
                    }[];
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取采购单信息 */
        export function getOrderInfo (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    results?: {
                        /** 采购单内单条id */
                        u_id?: string;
                        /** 单条标题 */
                        title?: string;
                    }[];
                };
            }>;
    }
    /** 市场数据相关接口 */
    export namespace APIs.market {
        /** 获取 店铺/档口 信息 */
        export function getShopList (
            data?:{
                /** 城市(id) */
                city?: string;
                /** 请求信息 */
                block_info?: {
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                    /** 当前列表请求index */
                    index?: number;
                };
            }
        ): Promise<{
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    results?: {
                        /** 档口简介 */
                        description?: string;
                        image?: string;
                        /** 分类 */
                        category?: string;
                        /** 标签 */
                        tags?: string[];
                        /** 主营 */
                        main?: string;
                        /** 提供服务 */
                        service?: string[];
                        u_id?: string;
                        /** 档口名称 */
                        title?: string;
                        price?: number;
                    }[];
                };
            }>;
        /** 获取店铺/档口信息 */
        export function getShopInfo (
            data?:{
                id?: string;
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    /** 分类 */
                    category?: string;
                    /** 联系方式 */
                    contact?: string;
                    /** 二维码名片 */
                    qr_code?: string;
                    /** 服务 */
                    service?: string[];
                    /** 收藏 */
                    fav?: boolean;
                    /** banner图 */
                    banner?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** 地区 */
                    area?: string;
                    /** 主营 */
                    main?: string;
                    /** 档口头像 */
                    avatar?: string;
                    /** 档口名称 */
                    title?: string;
                    u_id?: string;
                };
            }>;
        /** 获取 店铺/档口 商品 */
        export function getShopGoodsList (
            data?:{
                /** 请求信息 */
                block_info?: {
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                    /** 当前列表请求index */
                    index?: number;
                };
                u_id?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        price?: number;
                        image?: string;
                        u_id?: string;
                        /** 宝贝名称 */
                        title?: string;
                    }[];
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 收藏档口/店铺 */
        export function postShopFavAdd (
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
        /** 移除收藏档口/店铺 */
        export function postShopFavRemove (
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
    }
    /** 用户账号相关接口 */
    export namespace APIs.account {
        /** 用户注销登录 */
        export function getLogout (
            data?:{

            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {

                };
            }>;
        /** 用户登录接口 */
        export function postLogin (
            data?:{
                /** 密码 */
                password?: string;
                /** 账号 */
                account?: string;
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
                data?: {

                };
                meta?: {
                    msg?: string;
                    code?: number;
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
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 获取短信验证码 */
        export function getIdentificationCode (
            data?:{
                /** 用户手机号码 */
                mobile?: string;
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {

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
                    msg?: string;
                    code?: number;
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
                data?: {
                    /** 价格 */
                    price?: number;
                    /** 所属店铺/档口名 */
                    shop_name?: string;
                    /** 分类 */
                    category?: string;
                    u_id?: string;
                    /** 所属店铺/档口(id) */
                    shop_id?: string;
                    /** 图片 */
                    banner?: string[];
                    /** 地区 */
                    area?: string;
                    /** 收藏 */
                    fav?: boolean;
                    /** 淘宝价格 */
                    taobao_price?: number;
                    /** 商品名称 */
                    title?: string;
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
        /** 获取  商品/宝贝 列表 */
        export function getGoodsList (
            data?:{
                /** 请求信息 */
                block_info?: {
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                    /** 当前列表请求index */
                    index?: number;
                };
                u_id?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        image?: string;
                        price?: number;
                        u_id?: string;
                        /** 宝贝名称 */
                        title?: string;
                    }[];
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取 商品/宝贝 图片 */
        export function getGoodsImages (
            data?:{
                /** 请求信息 */
                block_info?: {
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
                u_id?: string;
            }
        ): Promise<{
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    results?: string[];
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
                    msg?: string;
                    code?: number;
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
                    A1?: {
                        u_id?: string;
                        service?: string[];
                        title?: string;
                        description?: string;
                        category?: string;
                        image?: string;
                        price?: number;
                        tags?: string[];
                        main?: string;
                    }[];
                    A3?: {
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                        list?: {
                            description?: string;
                            tags?: string[];
                            u_id?: string;
                            title?: string;
                            main?: string;
                            category?: string;
                            price?: number;
                            service?: string[];
                            image?: string;
                            goods_id?: string;
                        }[];
                    };
                    A2?: {
                        list?: {
                            goods_id?: string;
                            title?: string;
                            image?: string;
                            tags?: string[];
                            u_id?: string;
                            category?: string;
                            price?: number;
                            service?: string[];
                            description?: string;
                            main?: string;
                        }[];
                        header?: {
                            image?: string;
                            shop_id?: string;
                        };
                    };
                    A4?: {
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                        list?: {
                            u_id?: string;
                            price?: number;
                            image?: string;
                            main?: string;
                            tags?: string[];
                            description?: string;
                            category?: string;
                            goods_id?: string;
                            service?: string[];
                            title?: string;
                        }[];
                    };
                    A5?: {
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                        list?: {
                            category?: string;
                            description?: string;
                            service?: string[];
                            u_id?: string;
                            goods_id?: string;
                            price?: number;
                            main?: string;
                            tags?: string[];
                            image?: string;
                            title?: string;
                        }[];
                    }[];
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
                /** 请求信息 */
                block_info?: {
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                    /** 当前列表请求index */
                    index?: number;
                };
                /** 城市(id) */
                city?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        title?: string;
                        price?: number;
                        u_id?: string;
                        image?: string;
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
                };
            }>;
    }
}
