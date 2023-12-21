/**
 * 小程序首页
 */
import { useMemo, useState } from 'react'

import Taro, { getMenuButtonBoundingClientRect } from '@tarojs/taro'

import CustomButton from '@/components/customButton'
import CustomButton2 from '@/components/customButton2'
import Spin from '@/components/spin'

import { NavBar } from '@antmjs/vantui'

import styles from './index.module.less'

// const statusBarHeight = useMemo(() => {
//   const { statusBarHeight: _statusBarHeight } = getSystemInfoSync()
//   if (isNaN(_statusBarHeight)) {
//     return 22
//   }
//   return _statusBarHeight
// }, [])

// const getNavBarStyle = useMemo(() => {
//   return utils.style([
//     computed.barStyle({
//       zIndex,
//       statusBarHeight,
//       safeAreaInsetTop,
//       height: 50,
//     }) +
//       '; ' +
//       style,
//   ])
// }, [zIndex, statusBarHeight, safeAreaInsetTop, style])

// 获取系统状态栏高度
const { statusBarHeight = 0 } = Taro.getSystemInfoSync()
// 获取小程序右上角胶囊的大小
const { height, top } = Taro.getMenuButtonBoundingClientRect()

// const capsuleInfo = getMenuButtonBoundingClientRect();

/**
 *
 * 计算出小程序导航栏的整体高度，这里要加上系统状态栏的高度，
 * 否则小程序顶部内容会顶到状态栏最顶部位置
 */

const navBarHeight = height + (top - statusBarHeight) * 2 + statusBarHeight
/** 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高  */
// const navBarHeight =
// (capsuleInfo.top - statusBarHeight) * 2 + capsuleInfo.height + statusBarHeight;

const Home = () => {
  const [show] = useState(false)
  return (
    <Spin spin={show}>
      <div className={styles['home__page']}>
        <div
          className={styles['header']}
          style={{
            height: `${navBarHeight + 50}px`,
            paddingTop: `${statusBarHeight}px`,
          }}
        />
        <div className={styles['main']}>
          <div className={styles['daily__events']}>每日事项</div>
          <CustomButton />
        </div>
      </div>
    </Spin>
  )
}

export default Home
