/**
 * 头像展示组件
 */
import { forwardRef, useImperativeHandle } from 'react'

import styles from './index.module.less'

type Avatar2Props = {}

type Avatar2Type = {}

const Avatar2 = forwardRef<Avatar2Type, Avatar2Props>(function Component(props, ref) {
  const {} = props

  useImperativeHandle(
    ref,
    () => ({}),
    [],
  )

  return (
    <div className={styles['avatar2__box']}>
      <div>头像展示组件</div>
    </div>
  );
})

export default Avatar2
