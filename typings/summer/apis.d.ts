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
                    /** 头像 */
                    avatar?: string;
                    /** 生日 */
                    birthday?: string;
                    /** 账号名 */
                    account?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    id?: string;
                    /** 真实姓名 */
                    name?: string;
                };
            }>;
    }
    /** 采购单 */
    export namespace APIs.order {
        /** 获取采购单列表 */
        export function getOrderList (
            data?:{
                /** 城市(id) */
                city?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        image?: string;
                        u_id?: string;
                        /** dddd */
                        intro?: string;
                        title?: string;
                        price?: number;
                    }[];
                };
                meta?: {
                    code?: number;
                    msg?: string;
                };
            }>;
        /** 获取采购单单条记录 */
        export function getOrderItem (
            data?:{
                id?: string;
            }
        ): Promise<{
                data?: {
                    title?: string;
                    intro?: string;
                    price?: number;
                };
                meta?: {
                    code?: number;
                    msg?: string;
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
            }
        ): Promise<{
                meta?: {
                    code?: number;
                    msg?: string;
                };
                data?: {
                    results?: {
                        /** 分类 */
                        category?: string;
                        /** 标签 */
                        tags?: string[];
                        image?: string;
                        u_id?: string;
                        /** 档口简介 */
                        description?: string;
                        /** 提供服务 */
                        service?: string[];
                        /** 主营 */
                        main?: string;
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
                    /** 地区 */
                    area?: string;
                    /** 档口名称 */
                    title?: string;
                    /** 分类 */
                    category?: string;
                    /** 淘宝账号(旺旺) */
                    taobao_account?: string;
                    /** qq账号 */
                    qq?: string;
                    /** 联系方式 */
                    contact?: string;
                    /** 二维码名片 */
                    qr_code?: string;
                    /** 收藏 */
                    fav?: boolean;
                    u_id?: string;
                    /** 档口头像 */
                    avatar?: string;
                    /** 服务 */
                    service?: string[];
                    /** banner图 */
                    banner?: string;
                    /** 主营 */
                    main?: string;
                };
            }>;
        /** 获取 店铺/档口 商品 */
        export function getShopGoodsList (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        price?: number;
                        /** 宝贝名称 */
                        title?: string;
                        image?: string;
                        u_id?: string;
                    }[];
                };
                meta?: {
                    msg?: string;
                    code?: number;
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
                data?: {

                };
                meta?: {
                    code?: number;
                    msg?: string;
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
                /** 密码 */
                password?: string;
                /** 账号 */
                account?: string;
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
                /** 注册手机号 */
                mobile?: number;
                /** 验证码 */
                verification_code?: string;
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
                    /** 所属店铺/档口(id) */
                    shop?: string;
                    /** 分类 */
                    category?: string;
                    /** 图片 */
                    banner?: string[];
                    /** 地区 */
                    area?: string;
                    /** 价格 */
                    price?: number;
                    /** 收藏 */
                    fav?: boolean;
                    u_id?: string;
                    /** 档口名称 */
                    title?: string;
                    /** 淘宝价格 */
                    taobao_price?: number;
                };
            }>;
        /** 获取  商品/宝贝 列表 */
        export function getGoodsList (
            data?:{
                u_id?: string;
            }
        ): Promise<{
                data?: {
                    results?: {
                        u_id?: string;
                        image?: string;
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
    }
}
