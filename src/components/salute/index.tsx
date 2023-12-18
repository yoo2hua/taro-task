import { forwardRef, memo, useImperativeHandle, useState } from 'react'

import { Transition } from '@antmjs/vantui'

import styles from './index.module.less'

export interface SaluteType {
  open: () => void
  close: () => void
}
export interface SaluteProps {}

/** 礼花效果 */
const Salute = forwardRef<SaluteType, SaluteProps>(function Component(props, ref) {
  const [visible, setVisible] = useState(false)

  const open = () => {
    setVisible(true)
    setTimeout(() => {
      close()
    }, 3000)
  }

  const close = () => {
    setVisible(false)
  }

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [],
  )

  return (
    <Transition
      duration={{ enter: 300, leave: 1000 }}
      enterClass={styles['vanEnterClass']}
      enterActiveClass={styles['vanEnterActiveClass']}
      leaveActiveClass={styles['vanLeaveActiveClass']}
      leaveToClass={styles['vanLeaveToClass']}
      name="fade"
      show={visible}
    >
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
    </Transition>
  )
})

export default memo(Salute)
