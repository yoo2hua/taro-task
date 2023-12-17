import { useState } from 'react'

import Taro from '@tarojs/taro'

import IconFont from '@/components/iconfont'
import Tx from '@/components/tx'

import { Image, NavBar, Transition } from '@antmjs/vantui'

import styles from './index.module.less'

const Mine = () => {
  const [show, setShow] = useState(false)
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
  return (
    <div className={styles['mine__page']}>
      {/* <NavBar /> */}
      <div
        className={styles['header']}
        style={{
          height: `${navBarHeight + 100}px`,
          paddingTop: `${statusBarHeight}px`,
        }}
      ></div>
      <div className={styles['main']} onClick={() => setShow((pre) => !pre)}>
        <div className={styles['avatar__wrapper']}>
          <Image className={styles['avatar']} src="" radius={'50%'} />
          <p className={styles['nickname']}>鱿鱿花</p>
        </div>
        <div className={styles['statistic__wrapper']}>
          <div className={styles['statistic__item']}>
            <div className={styles['type']}>
              <IconFont name="statistic-points" size={50} />
              <div className={styles['name']}>积分</div>
            </div>
            <div className={styles['data']}>999</div>
          </div>
          <div className={styles['statistic__item']}>
            <div className={styles['type']}>
              <IconFont name="statistic-task" size={50} />
              <div className={styles['name']}>任务</div>
            </div>
            <div className={styles['data']}>999</div>
          </div>
          <div className={styles['statistic__item']}>
            <div className={styles['type']}>
              <IconFont name="statistic-gift" size={50} />
              <div className={styles['name']}>礼品</div>
            </div>
            <div className={styles['data']}>999</div>
          </div>
        </div>
        <div className={styles['data__wrapper']}></div>

        <Tx />
      </div>
    </div>
  )
}

export default Mine
