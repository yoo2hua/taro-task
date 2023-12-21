/** 礼品 */
import request from '@/service/request'

import {
  GiftCreateRequest,
  GiftCreateResponse,
  GiftGetRequest,
  GiftGetResponse,
  GiftRedeemRequest,
  GiftRedeemResponse,
} from './type'

const gateway = '/gift'

/** 新增礼品 */
export const GiftCreate = async (data: GiftCreateRequest): Promise<GiftCreateResponse> => {
  return await request(`${gateway}/update`, {
    method: 'POST',
    data: data,
  })
}

/** 查询礼品 */
export const GiftGet = async (data: GiftGetRequest): Promise<GiftGetResponse> => {
  return await request(`${gateway}/get`, {
    data: data,
  })
}

/** 兑换礼品 */
export const GiftRedeem = async (data: GiftRedeemRequest): Promise<GiftRedeemResponse> => {
  return await request(`${gateway}/redeem`, {
    method: 'POST',
    data: data,
  })
}
