declare module "summer" {
    /** user */
    export namespace APIs.user {
        /** 获取用户信息 */
        export function getUserInfo (
            data?:{

            }
        ): Promise<{
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    id?: string;
                    /** 头像 */
                    avatar?: string;
                    /** 生日 */
                    birthday?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 账号名 */
                    account?: string;
                    /** 真实姓名 */
                    name?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
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
                meta?: {
                    msg?: string;
                    code?: number;
                };
                data?: {
                    results?: {
                        u_id?: string;
                        title?: string;
                        image?: string;
                        /** 完成数量 */
                        completed?: number;
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
                data?: {
                    results?: {
                        /** 分类 */
                        category?: string;
                        image?: string;
                        price?: number;
                        /** 档口简介 */
                        description?: string;
                        /** 标签 */
                        tags?: string[];
                        /** 提供服务 */
                        service?: string[];
                        /** 档口名称 */
                        title?: string;
                        /** 主营 */
                        main?: string;
                        u_id?: string;
                    }[];
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取店铺/档口信息 */
        export function getShopInfo (
            data?:{
                id?: string;
            }
        ): Promise<{
                data?: {
                    /** 二维码名片 */
                    qr_code?: string;
                    /** 分类 */
                    category?: string;
                    /** banner图 */
                    banner?: string;
                    /** 收藏 */
                    fav?: boolean;
                    /** 地区 */
                    area?: string;
                    /** qq账号 */
                    qq?: string;
                    u_id?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** 主营 */
                    main?: string;
                    /** 服务 */
                    service?: string[];
                    /** 档口头像 */
                    avatar?: string;
                    /** 联系方式 */
                    contact?: string;
                    /** 档口名称 */
                    title?: string;
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
                        price?: number;
                        u_id?: string;
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
                    code?: number;
                    msg?: string;
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
                /** 账号 */
                account?: string;
                /** 密码 */
                password?: string;
            }
        ): Promise<{
                /** 返回数据 */
                data?: {
                    token?: string;
                };
                meta?: {
                    /** 返回信息 */
                    msg?: string;
                    /** 状态码 */
                    code?: number;
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
                    msg?: string;
                    code?: number;
                };
                data?: {

                };
            }>;
        /** 注册新用户 */
        export function postRegister (
            data?:{
                /** 验证码 */
                verification_code?: string;
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
                    /** 档口名称 */
                    title?: string;
                    /** 图片 */
                    banner?: string[];
                    /** 价格 */
                    price?: number;
                    /** 地区 */
                    area?: string;
                    /** 收藏 */
                    fav?: boolean;
                    /** 淘宝价格 */
                    taobao_price?: number;
                    u_id?: string;
                    /** 所属店铺/档口(id) */
                    shop?: string;
                    /** 分类 */
                    category?: string;
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
                    /** 当前列表请求index */
                    index?: number;
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                };
                u_id?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        /** 宝贝名称 */
                        title?: string;
                        image?: string;
                        price?: number;
                        u_id?: string;
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
                    /** 每次请求返回的最大结果数量 */
                    size?: number;
                    /** 当前列表请求index */
                    index?: number;
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
                    code?: number;
                    msg?: string;
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
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {

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
                    results?: {
                        A1?: {
                            description?: string;
                            service?: string[];
                            title?: string;
                            main?: string;
                            category?: string;
                            u_id?: string;
                            image?: string;
                            price?: number;
                            tags?: string[];
                        }[];
                        A2?: {
                            header?: {
                                shop_id?: string;
                                img?: string;
                            };
                            list?: {
                                service?: string[];
                                category?: string;
                                main?: string;
                                u_id?: string;
                                description?: string;
                                tags?: string[];
                                title?: string;
                                price?: number;
                                image?: string;
                            }[];
                        };
                    };
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
    }
}
