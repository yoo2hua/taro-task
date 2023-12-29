/**
 * 我的任务
 */
import { useRef, useState } from 'react'

import { showToast } from '@tarojs/taro'

import { InfiniteScroll, InfiniteScrollInstance, Search } from '@antmjs/vantui'

import styles from './index.module.less'

import MyTaskDropdown from './components/myTaskDropdown'
import { myTaskTypeEnum, sortEnum } from './constants'
import { DropdownMenuParams } from './types'

const MyTask = () => {
  const infiniteScrollInstance = useRef<InfiniteScrollInstance>()

  const [list, setList] = useState<number[]>([])

  const [dropdownMenuParams, setDropdownMenuParams] = useState<DropdownMenuParams>({
    title: '',
    taskType: myTaskTypeEnum.undertaken.code,
    sort: sortEnum.time.code,
  })

  const getList = (params: Partial<DropdownMenuParams> = {}) => {
    const searchParams = {
      ...dropdownMenuParams,
      ...params,
    }

    showToast({
      title: `${JSON.stringify({
        ...searchParams,
        taskType: myTaskTypeEnum[searchParams.taskType]?.label,
        sort: sortEnum[searchParams.sort]?.label,
      })}`,
      icon: 'none',
    })
  }

  return (
    <div className={styles['my-task__page']}>
      <Search
        className={styles['search']}
        placeholder="请输入任务标题"
        value={dropdownMenuParams.title}
        onChange={(e) => {
          setDropdownMenuParams((pre) => ({ ...pre, title: e.detail }))
        }}
        onSearch={() => {
          getList()
        }}
      />
      <div className={styles['main']}>
        <MyTaskDropdown
          dropdownMenuParams={dropdownMenuParams}
          setDropdownMenuParams={setDropdownMenuParams}
          getList={getList}
        />
        <div className={styles['tab-content__wrapper']}>
          {list.map((i) => (
            <div key={i} className={styles['content']}>
              内容 {i}
            </div>
          ))}
          <InfiniteScroll
            loadMore={() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  if (!list.length) {
                    setList([1, 2, 3, 4, 5].map((i) => i * Math.random()))
                    resolve('loading')
                  }

                  if (Math.random() > 0.5) {
                    setList((pre) => [...pre, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => i * Math.random())])
                    resolve('loading')
                  } else {
                    resolve('complete')
                  }
                }, 1000)
              })
            }}
            ref={infiniteScrollInstance}
          ></InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

export default MyTask
