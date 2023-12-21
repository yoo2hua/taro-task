/** 新增礼品参数 */
export interface GiftCreateRequest {
  title: string
  description?: string
  gift_points: number
  quantity: number
}

/** 新增礼品响应 */
export interface GiftCreateResponse {}

/** 查询礼品参数 */
export interface GiftGetRequest {
  /** 页码 */
  page_num: number
  /** 每页数量 */
  page_size: number
  /** 标题 */
  title?: string
}

/** 查询礼品响应 */
export interface GiftGetResponse {}

/** 兑换礼品参数 */
export interface GiftRedeemRequest {
  /** 礼品id */
  gift_id: number
}

/** 兑换礼品响应 */
export interface GiftRedeemResponse {}
