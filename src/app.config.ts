export default defineAppConfig({
  // entryPagePath: 'pages/createTask/index',
  /** PAGE_START */

  // ! DO NOT CHANGE THE CODE CHUNK MANUALLY !
  // This code chunk is automatically generated
  // To change this code chunk, please run "pnpm route"

  pages: [
    'pages/home/index',
    'pages/404/index',
    'pages/createTask/index',
    'pages/mine/index',
    'pages/myTask/index',
    'pages/personalProfileEdit/index',
    'pages/pointMall/index',
    'pages/pointRecord/index',
    'pages/task/index',
  ],
  subpackages: [],

  /** PAGE_END */
  tabBar: {
    custom: true,
    /** TABBAR_START */

    // ! DO NOT CHANGE THE CODE CHUNK MANUALLY !
    // This code chunk is automatically generated
    // To change this code chunk, please run "pnpm route"

    list: [
      { pagePath: 'pages/home/index', text: '首页' },
      { pagePath: 'pages/mine/index', text: '我的' },
      { pagePath: 'pages/pointMall/index', text: '商店' },
      { pagePath: 'pages/task/index', text: '任务' },
    ],

    /** TABBAR_END */
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {
    iconfont: `components/iconfont/${process.env.TARO_ENV}/${process.env.TARO_ENV}`,
  },
})
