/** 查询用户发布的任务参数 */
export interface UserTaskPublishedListRequest {
  /** 页码 */
  page_num: number
  /** 每页数量 */
  page_size: number
  /** 标题 */
  title?: string
}

/** 查询用户发布的任务响应 */
export interface UserTaskPublishedListResponse {}

/** 查询用户承接的任务参数 */
export interface UserTaskUndertakenListRequest {
  /** 页码 */
  page_num: number
  /** 每页数量 */
  page_size: number
  /** 标题 */
  title?: string
}

/** 查询用户承接的任务响应 */
export interface UserTaskUndertakenListResponse {}
