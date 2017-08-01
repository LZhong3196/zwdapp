declare module "summer" {
    /** user */
    export namespace APIs.user {
        /** 获取用户信息 */
        export function getUserInfo (
            data?:{

            }
        ): Promise<{
                data?: {
                    /** 头像 */
                    avatar?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 生日 */
                    birthday?: string;
                    /** 真实姓名 */
                    name?: string;
                    id?: string;
                    /** 账号名 */
                    account?: string;
                    /** 顶部简介背景 */
                    banner?: string;
                };
                meta?: {
                    code?: number;
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
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
                /** 采购单状态 */
                status?: number;
            }
        ): Promise<{
                data?: {
                    results?: {
                        u_id?: string;
                        image?: string;
                        /** 城市 */
                        city?: string;
                        /** 完成数量 */
                        completed?: number;
                        title?: string;
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
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
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    results?: {
                        /** 主营 */
                        main?: string;
                        /** 分类 */
                        category?: string;
                        /** 提供服务 */
                        service?: string[];
                        /** 档口名称 */
                        title?: string;
                        u_id?: string;
                        /** 档口简介 */
                        description?: string;
                        image?: string;
                        /** 标签 */
                        tags?: string[];
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
                data?: {
                    /** qq账号 */
                    qq?: string;
                    /** 收藏 */
                    fav?: boolean;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** 地区 */
                    area?: string;
                    /** 服务 */
                    service?: string[];
                    /** 二维码名片 */
                    qr_code?: string;
                    /** 分类 */
                    category?: string;
                    /** 档口名称 */
                    title?: string;
                    /** 主营 */
                    main?: string;
                    /** banner图 */
                    banner?: string;
                    u_id?: string;
                    /** 档口头像 */
                    avatar?: string;
                    /** 联系方式 */
                    contact?: string;
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取 店铺/档口 商品 */
        export function getShopGoodsList (
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
                    results?: {
                        image?: string;
                        price?: number;
                        /** 宝贝名称 */
                        title?: string;
                        u_id?: string;
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
                    code?: number;
                    msg?: string;
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
                data?: {

                };
                meta?: {
                    msg?: string;
                    code?: number;
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
                /** 注册手机号 */
                mobile?: number;
                /** 验证码 */
                verification_code?: string;
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
    /** 商品/宝贝 模块 */
    export namespace APIs.goods {
        /** 获取 商品/宝贝 信息 */
        export function getGoodsInfo (
            data?:{
                id?: string;
            }
        ): Promise<{
                data?: {
                    /** 分类 */
                    category?: string;
                    /** 商品名称 */
                    title?: string;
                    /** 地区 */
                    area?: string;
                    /** 所属店铺/档口名 */
                    shop_name?: string;
                    /** 图片 */
                    banner?: string[];
                    /** 淘宝价格 */
                    taobao_price?: number;
                    u_id?: string;
                    /** 所属店铺/档口(id) */
                    shop_id?: string;
                    /** 价格 */
                    price?: number;
                    /** 收藏 */
                    fav?: boolean;
                };
                meta?: {
                    code?: number;
                    msg?: string;
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
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    results?: {
                        u_id?: string;
                        /** 宝贝名称 */
                        title?: string;
                        price?: number;
                        image?: string;
                    }[];
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
                meta?: {
                    code?: number;
                    msg?: string;
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
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    A2?: {
                        header?: {
                            image?: string;
                            shop_id?: string;
                        };
                        list?: {
                            description?: string;
                            main?: string;
                            u_id?: string;
                            image?: string;
                            tags?: string[];
                            goods_id?: string;
                            price?: number;
                            service?: string[];
                            title?: string;
                            category?: string;
                        }[];
                    };
                    A1?: {
                        description?: string;
                        image?: string;
                        tags?: string[];
                        title?: string;
                        main?: string;
                        service?: string[];
                        u_id?: string;
                        category?: string;
                        price?: number;
                    }[];
                    A4?: {
                        header?: {
                            image?: string;
                            shop_id?: string;
                        };
                        list?: {
                            u_id?: string;
                            service?: string[];
                            main?: string;
                            description?: string;
                            title?: string;
                            goods_id?: string;
                            category?: string;
                            price?: number;
                            image?: string;
                            tags?: string[];
                        }[];
                    };
                    A3?: {
                        list?: {
                            service?: string[];
                            goods_id?: string;
                            tags?: string[];
                            image?: string;
                            category?: string;
                            u_id?: string;
                            main?: string;
                            price?: number;
                            title?: string;
                            description?: string;
                        }[];
                        header?: {
                            shop_id?: string;
                            image?: string;
                        };
                    };
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
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    results?: {
                        title?: string;
                        price?: number;
                        u_id?: string;
                        image?: string;
                    }[];
                };
            }>;
    }
}
