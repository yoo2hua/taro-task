/**
 * 小程序首页
 */
import { useState } from 'react'

import { Button, Form, Switch } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'

import Spin from '@/components/spin'

import styles from './index.module.less'

// 获取系统状态栏高度
const { statusBarHeight = 0 } = Taro.getSystemInfoSync()
// 获取小程序右上角胶囊的大小
const { height, top } = Taro.getMenuButtonBoundingClientRect()

const navBarHeight = height + (top - statusBarHeight) * 2 + statusBarHeight

const Home = () => {
  const [show] = useState(false)
  useReady(() => {})

  const formSubmit = (e) => {
    console.log(e)
  }

  const formReset = (e) => {
    console.log(e)
  }
  return (
    <Spin spin={show}>
      <div className={styles['home__page']}>
        <div
          className={styles['header']}
          style={{
            height: `${navBarHeight + 50}px`,
            paddingTop: `${statusBarHeight}px`,
          }}
        />
        <div className={styles['main']} id="main">
          <div className={styles['daily-events']}>每日事项</div>
          <Form onSubmit={formSubmit} onReset={formReset}>
            <Switch name="switch" className="form-switch"></Switch>
            <Button type="primary" form-type="submit">
              submit
            </Button>
          </Form>
        </div>
      </div>
    </Spin>
  )
}

export default Home
