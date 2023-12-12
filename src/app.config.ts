export default defineAppConfig({
  pages: ['pages/home/index', 'pages/task/index', 'pages/mine/index'],
  tabBar: {
    custom: true,
    /** TABBAR_START */

    list: [
      { pagePath: 'pages/home/index', text: '首页' },
      { pagePath: 'pages/task/index', text: '任务' },
      { pagePath: 'pages/mine/index', text: '我的' },
    ],

    /** TABBAR_END */
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
})
