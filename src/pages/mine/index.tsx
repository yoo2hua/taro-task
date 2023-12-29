import { useRef } from 'react'

import Taro from '@tarojs/taro'

import Avatar from '@/components/avatar'
import ChangeAvatarDialog, { ChangeAvatarDialogType } from '@/components/changeAvatarDialog'
import IconFont from '@/components/iconfont'
import Salute, { SaluteType } from '@/components/salute'
import Spin from '@/components/spin'

import useBoolean from '@/hooks/utils/useBoolean'

import { formatNumber } from '@/utils/index'

import { navi } from '@/routes'

import styles from './index.module.less'

const Mine = () => {
  const [loading, { set: setLoading }] = useBoolean(false)

  const changeAvatarDialogRef = useRef<ChangeAvatarDialogType>(null)
  const saluteRef = useRef<SaluteType>(null)

  // 获取系统状态栏高度
  const { statusBarHeight = 0 } = Taro.getSystemInfoSync()
  // 获取小程序右上角胶囊的大小
  const { height, top } = Taro.getMenuButtonBoundingClientRect()

  const navBarHeight = height + (top - statusBarHeight) * 2 + statusBarHeight
  return (
    <Spin spin={loading}>
      <div className={styles['mine__page']}>
        <div
          className={styles['header']}
          style={{
            height: `${navBarHeight + 100}px`,
            paddingTop: `${statusBarHeight}px`,
          }}
        ></div>
        <div className={styles['main']}>
          <div className={styles['avatar__wrapper']}>
            <Avatar wrapperClass={styles['avatar']} />
            <div className={styles['edit']} onClick={() => changeAvatarDialogRef.current?.open()}>
              <IconFont name="line-edit" />
            </div>
          </div>
          <div className={styles['nickname__wrapper']}>
            <p className={styles['nickname']}>鱿鱿花</p>
          </div>

          <div className={styles['statistic__wrapper']}>
            <div className={styles['statistic__item']} onClick={() => navi('point')}>
              <div className={styles['type']}>
                <IconFont name="statistic-points" size={50} />
                <div className={styles['name']}>积分</div>
              </div>
              <div className={styles['data']}>{formatNumber(9999)}</div>
            </div>
            {/* <div className={styles['statistic__item']}>
              <div className={styles['type']}>
                <IconFont name="statistic-task" size={50} />
                <div className={styles['name']}>任务</div>
              </div>
              <div className={styles['data']}>999</div>
            </div> */}
            <div className={styles['statistic__item']}>
              <div className={styles['type']}>
                <IconFont name="statistic-gift" size={50} />
                <div className={styles['name']}>礼品</div>
              </div>
              <div className={styles['data']}>999</div>
            </div>
          </div>

          <div
            className={styles['task__wrapper']}
            onClick={() => {
              navi('myTask')
            }}
          >
            我的任务
          </div>

          <Salute ref={saluteRef} />
        </div>
        <ChangeAvatarDialog ref={changeAvatarDialogRef} setLoading={setLoading} />
      </div>
    </Spin>
  )
}

export default Mine
