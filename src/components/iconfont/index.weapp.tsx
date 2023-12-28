/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

export type IconNames = 'line-edit' | 'line-back' | 'cry-face' | 'statistic-gift' | 'statistic-task' | 'rili' | 'shouru' | 'statistic-points' | 'lijie' | 'zhangdan' | 'youxi' | 'youhuiquan' | 'xunzhang' | 'tab-bar-user' | 'tab-bar-store' | 'tab-bar-task' | 'tab-bar-home';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 32,
};

export default IconFont;
