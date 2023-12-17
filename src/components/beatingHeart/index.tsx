import { memo } from 'react'

import styles from './index.module.less'

const BeatingHeart = () => {
  return (
    <div className={styles['heart']}>
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
      <span className={styles['heart-item']} />
    </div>
  )
}

export default memo(BeatingHeart)
