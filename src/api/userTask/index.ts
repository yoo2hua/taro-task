/** 用户任务 */
import request from '@/service/request'

import {
  UserTaskPublishedListRequest,
  UserTaskPublishedListResponse,
  UserTaskUndertakenListRequest,
  UserTaskUndertakenListResponse,
} from './type'

const gateway = '/user-task'

/** 查询用户发布的任务 */
export const UserTaskPublishedList = async (
  data: UserTaskPublishedListRequest,
): Promise<UserTaskPublishedListResponse> => {
  return await request(`${gateway}/published-list`, {
    data: data,
  })
}

/** 查询用户承接的任务 */
export const UserTaskUndertakenList = async (
  data: UserTaskUndertakenListRequest,
): Promise<UserTaskUndertakenListResponse> => {
  return await request(`${gateway}/undertaken-list`, {
    data: data,
  })
}
