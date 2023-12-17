import { FC, memo, ReactNode } from 'react'

import { Overlay } from '@antmjs/vantui'

import styles from './index.module.less'

import BeatingHeart from '../beatingHeart'

type SpinProps = {
  spin?: boolean
  children?: ReactNode
}

const Spin: FC<SpinProps> = (props: SpinProps) => {
  const { spin = false, children } = props

  return (
    <>
      {children}
      <Overlay show={spin} className={styles['overlay']}>
        <BeatingHeart />
      </Overlay>
    </>
  )
}

export default memo(Spin)
