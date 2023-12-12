import { useEffect } from 'react'

import Taro from '@tarojs/taro'

// import { GetNavTitle } from '@/api/decoration';
// import { PAGE_TYPE } from '@/type/decoration.type';

interface Params {
  title?: string
  // pageType?: PAGE_TYPE;
}
/**
 * 修改nav title
 */
const useNavBarTitle = ({ title }: Params) => {
  const setTitle = (val) => {
    Taro.setNavigationBarTitle({
      title: val,
    })
  }

  useEffect(() => {
    if (title) {
      setTitle(title)
    }
  }, [title])
}

export default useNavBarTitle
