/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';

export type IconNames = 'line-search' | 'line-edit' | 'line-back' | 'cry-face' | 'statistic-gift' | 'statistic-task' | 'rili' | 'shouru' | 'statistic-points' | 'lijie' | 'zhangdan' | 'youxi' | 'youhuiquan' | 'xunzhang' | 'tab-bar-user' | 'tab-bar-store' | 'tab-bar-task' | 'tab-bar-home';

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<IconProps> = () => {
  return null;
};

export default IconFont;
