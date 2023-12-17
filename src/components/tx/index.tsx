import { FC, memo } from 'react'

import styles from './index.module.less'

type TxProps = {}

const Tx: FC<TxProps> = (props: TxProps) => {
  const {} = props

  return (
    <div className={styles['results-summary-container']}>
      <div className={styles['confetti']}>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
        <div className={styles['confetti-piece']}></div>
      </div>
    </div>
  )
}

export default memo(Tx)
