/**
 * 404
 */
import IconFont from '@/components/iconfont'

import { navi } from '@/routes/navigator.provider'

import styles from './index.module.less'

const NotFound = () => {
  return (
    <div className={styles['not-found__page']}>
      <div className={styles['icon__wrapper']}>
        <IconFont name="cry-face" size={280} />
      </div>
      <p className={styles['main-text']}>页面被外星人偷走了</p>
      <div
        className={styles['secondary']}
        onClick={() => {
          navi('home')
        }}
      >
        <IconFont name="line-back" size={36} />
        <p className={styles['secondary-text']}>去其它页面看看吧~</p>
      </div>
    </div>
  )
}

export default NotFound
