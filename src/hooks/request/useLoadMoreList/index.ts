import { Reducer, useEffect, useReducer, useRef } from 'react'

import reducer, { Action, DEFAULT_PAGE_NUMBER, getInitState } from './reducer'
import { Result, ReturnObject, State, UseLoadMoreListConfig } from './types'

/**
 * 获取分页数据的封装
 */

/** 默认每页大小 */
const DEFAULT_PAGE_SIZE = 10

/** 初始state，默认 loading 为 false，然后与数据层的 state 和并 */
const getDefaultState = (config: UseLoadMoreListConfig<any, any>) => ({
  ...getInitState<any, any>(),
  loading: !!config.autoRun,
})

/** 默认传入的配置 */
const defaultConfig = {
  dataKey: 'data',
  totalKey: 'count',
  autoRun: true,
  requesetHeader: {},
}

/**
 * 封装分页数据（适用于无限滚动场景）
 * @param request 发送请求的函数，需带page_num参数
 * @param config 配置参数
 */

const useLoadMoreList = <
  Data extends object,
  Params extends { page_num: number; page_size: number } = any,
  Extra = { [key: string]: any },
>(
  /** 请求的函数 */
  request: (params: Params, requesetHeader: Record<string, any>) => Promise<Result>,
  /** 配置项 */
  config: UseLoadMoreListConfig<Result, Parameters<typeof request>[0]>,
): ReturnObject<Data, Extra> => {
  /** 防止多次请求 */
  const lockingRef = useRef(false)
  /** 确保 config 的参数被更改能同步更新 */
  const configRef = useRef({ ...defaultConfig, ...config })
  const [state, dispatch] = useReducer<Reducer<State<Data, Extra>, Action>>(reducer, getDefaultState(configRef.current))

  const { pageSize = DEFAULT_PAGE_SIZE } = configRef.current

  const hasMore = state.page_num * pageSize < state.total

  const clear = () => {
    dispatch({ type: 'RESET' })
  }

  const baseQuery = async ({ page_num }: { page_num: number }, isReset: boolean = false) => {
    // 解构配置参数供后方使用
    const {
      idKey,
      params,
      dataKey = 'data',
      totalKey = 'count',
      errorCallback,
      successCallback,
      transformResponse,
      pageSize = DEFAULT_PAGE_SIZE,
      requesetHeader,
    } = configRef.current
    // 获取请求参数，主要是一些除了 page_size / page_num 外的页务参数
    const requestParams = (params || {}) as Params
    // 请求锁，防止同时多次请求导致乱序
    if (lockingRef.current) return
    lockingRef.current = true
    // 如果是请求前清空，则先清空数据
    if (isReset) clear()
    // 请求前状态变更，主要 loading 态变更
    dispatch({ type: 'BEFORE_REQUEST' })
    // 向后端发起请求，并返回 Promise，方便调用方处理
    return request(
      {
        ...requestParams,
        page_num: page_num,
        page_size: pageSize,
      },
      requesetHeader,
    )
      .then((result) => {
        console.log('🌊 ~ file: index.ts:125 ~ baseQuery ~ result:', result)

        // 对数据进行转换
        if (transformResponse) result = transformResponse(result)
        // 执行传入的成功回调
        if (successCallback) successCallback(result)
        // 通过传入的 dataKey 和 totalKey 取到 dataList 和 total
        let { [dataKey]: ResponseData, [totalKey]: total, ...otherResult } = result
        // 把数据传到数据层处理
        dispatch({
          type: 'REQUEST_SUCCESS',
          payload: {
            idKey,
            total,
            page_num,
            data: ResponseData || [],
            extra: otherResult,
          },
        })
        return result
      })
      .catch((error) => {
        // 失败梳理，调用传入的回调
        if (errorCallback) errorCallback(error)
        // 通知数据层变更数据
        dispatch({
          type: 'REQUEST_FAIL',
          payload: { error },
        })
        console.log(error)
      })
      .finally(() => {
        // 解锁
        lockingRef.current = false
      })
  }

  const getNextPage = async () => {
    try {
      const res = await baseQuery({ page_num: state.page_num + 1 })
      console.log('🌊 ~ file: index.ts:137 ~ getNextPage ~ res:', res)

      const _hasMore = res?.data?.length === pageSize
      return Promise.resolve({ hasMore: _hasMore })

      // return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const reset = (isClearAfterRequestSuccess = false) => {
    if (!isClearAfterRequestSuccess) clear()
    return baseQuery({ page_num: DEFAULT_PAGE_NUMBER }, isClearAfterRequestSuccess)
  }

  const run = () => {
    return reset()
  }
  // 保持 current 最新
  useEffect(() => {
    configRef.current = { ...defaultConfig, ...config }
  })

  useEffect(() => {
    if (configRef.current.autoRun) {
      baseQuery({ page_num: state.page_num })
    }
  }, [])

  return {
    ...state,
    hasMore,
    run,
    reset,
    getNextPage,
  }
}

export default useLoadMoreList
