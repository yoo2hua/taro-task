/** 新增任务参数 */
export interface TaskCreateRequest {
  /** 标题 */
  title: string
  /** 内容 */
  content?: string
  /** 任务积分 */
  task_points: number
  /** 有效天数 */
  task_valid_days: number
}

/** 新增任务响应 */
export interface TaskCreateResponse {}

/** 查询任务参数 */
export interface TaskGetRequest {
  /** 页码 */
  page_num: number
  /** 每页数量 */
  page_size: number
  /** 标题 */
  title?: string
  /** 任务状态（0 已发布、1 已承接、2 待结算、3 已结算、4 已过期） */
  status?: number
}

/** 查询任务响应 */
export interface TaskGetResponse {}

/** 承接任务参数 */
export interface TaskUndertakeRequest {
  /** 任务id */
  task_id: number
}

/** 承接任务响应 */
export interface TaskUndertakeResponse {}

/** 完成任务参数 */
export interface TaskCompleteRequest {
  /** 任务id */
  task_id: number
}

/** 完成任务响应 */
export interface TaskCompleteResponse {}

/** 结算任务参数 */
export interface TaskSettlementRequest {
  /** 任务id */
  task_id: number
}

/** 结算任务响应 */
export interface TaskSettlementResponse {}
