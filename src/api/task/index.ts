/** 任务 */
import request from '@/service/request'

import './type'
import {
  TaskCreateRequest,
  TaskCreateResponse,
  TaskGetRequest,
  TaskGetResponse,
  TaskUndertakeRequest,
  TaskUndertakeResponse,
} from './type'

const gateway = '/task'

/** 新增任务 */
export const TaskCreate = async (data: TaskCreateRequest): Promise<TaskCreateResponse> => {
  return await request(`${gateway}/create`, {
    method: 'POST',
    data: data,
  })
}

/** 查询任务 */
export const TaskGet = async (data: TaskGetRequest): Promise<TaskGetResponse> => {
  return await request(`${gateway}/get`, {
    data: data,
  })
}

/** 承接任务 */
export const TaskUndertake = async (data: TaskUndertakeRequest): Promise<TaskUndertakeResponse> => {
  return await request(`${gateway}/undertake`, {
    method: 'POST',
    data: data,
  })
}

/** 完成任务 */
export const TaskComplete = async (data: TaskUndertakeRequest): Promise<TaskUndertakeResponse> => {
  return await request(`${gateway}/undertake`, {
    method: 'POST',
    data: data,
  })
}

/** 结算任务 */
export const TaskSettlement = async (data: TaskUndertakeRequest): Promise<TaskUndertakeResponse> => {
  return await request(`${gateway}/settlement`, {
    method: 'POST',
    data: data,
  })
}

