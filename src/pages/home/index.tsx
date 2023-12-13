/**
 * 小程序首页
 */
import { Button } from '@antmjs/vantui'

import styles from './index.module.less'

const Home = () => {
  return (
    <div className={styles['home__page']}>
      <p>小程序首页</p>
      <Button type='primary'>123</Button>
    </div>
  )
}

export default Home
