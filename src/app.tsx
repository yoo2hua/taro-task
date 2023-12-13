import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import './app.less'
import store from './store'
import setup from './utils/setup'

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // setup()
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // this.props.children 是将要会渲染的页面
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
