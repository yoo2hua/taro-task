/**
 * 小程序首页
 */
import { useState } from 'react'

import Taro, { useReady } from '@tarojs/taro'

import classNames from 'classnames'

import Spin from '@/components/spin'

import { getPeriodOfDay } from '@/utils/time'

import styles from './index.module.less'

// 获取系统状态栏高度
const { statusBarHeight = 0 } = Taro.getSystemInfoSync()
// 获取小程序右上角胶囊的大小
const { height, top } = Taro.getMenuButtonBoundingClientRect()

const navBarHeight = height + (top - statusBarHeight) * 2 + statusBarHeight

const Home = () => {
  const [show] = useState(false)
  useReady(() => {})

  return (
    <Spin spin={show}>
      <div className={styles['home__page']}>
        <div
          className={styles['header']}
          style={{
            height: `${navBarHeight}px`,
            paddingTop: `${statusBarHeight}px`,
          }}
        />
        <div className={styles['main']} id="main">
          <div className={classNames(styles['card'])}>{getPeriodOfDay()}好</div>
          <div className={classNames(styles['card'], styles['daily-events'])}>每日事项</div>
        </div>
      </div>
    </Spin>
  )
}

export default Home
