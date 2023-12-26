import { FC, memo } from 'react'

import styles from './index.module.less'

type PointProps = {}

const Point: FC<PointProps> = (props: PointProps) => {
  const {} = props

  return <div className={styles['point__page']}>积分</div>
}

export default memo(Point)
