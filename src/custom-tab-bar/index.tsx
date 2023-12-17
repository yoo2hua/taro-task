import { switchTab } from '@tarojs/taro'

import classNames from 'classnames'

import IconFont from '@/components/iconfont'

import { useAppSelector } from '@/hooks/redux'

import store from '@/store'
import tabbarSlice from '@/store/modules/tabbar'

import { Tabbar, TabbarItem } from '@antmjs/vantui'

import styles from './index.module.less'

// @ts-ignore
// eslint-disable-next-line no-undef
wx.onAppRoute((route) => {
  console.log('onAppRoute', route.path)
  const path = route.path
  store.dispatch(tabbarSlice.actions.updateActivePage(path))
})

export default function CustomTabbar() {
  const tabbarConfig = useAppSelector((state) => state.tabbar)

  const onTabClick = (pagePath: string) => {
    const url = '/' + pagePath
    switchTab({ url })
  }

  return (
    <Tabbar
      className={styles['tabbar']}
      active={tabbarConfig.active}
      onChange={(e) => {
        onTabClick(e.detail as string)
      }}
      safeAreaInsetBottom={true}
      activeColor="#fbb1bdff"
      inactiveColor="#fae0e4ff"
    >
      {tabbarConfig.list.map((item) => {
        // const active = item.pagePath === tabbarConfig.active

        return (
          <TabbarItem
            name={item.pagePath}
            className={classNames(styles['item'], {})}
            renderIcon={<IconFont color={'#fae0e4ff'} name={item.icon} />}
            renderIconActive={<IconFont color={'#fbb1bdff'} name={item.icon} />}
          >
            <div>{item.text}</div>
          </TabbarItem>
        )
      })}
    </Tabbar>
  )
}
