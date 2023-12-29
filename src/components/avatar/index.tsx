import { forwardRef, memo, useImperativeHandle, useState } from 'react'

import classNames from 'classnames'

import avatarPic01 from '@/assets/images/avatar/01.jpg'
import avatarPic02 from '@/assets/images/avatar/02.jpg'
import avatarPic03 from '@/assets/images/avatar/03.jpg'
import avatarPic04 from '@/assets/images/avatar/04.jpg'
import avatarPic05 from '@/assets/images/avatar/05.jpg'
import avatarPic06 from '@/assets/images/avatar/06.jpg'
import avatarPic07 from '@/assets/images/avatar/07.jpg'

import { Image, ImageProps } from '@antmjs/vantui'

import styles from './index.module.less'

const avatarPics = [avatarPic01, avatarPic02, avatarPic03, avatarPic04, avatarPic05, avatarPic06, avatarPic07]

export type AvatarProps = { wrapperClass?: string; avatar?: number | string } & Partial<ImageProps>

export type AvatarType = {
  avatar: number | string
  setAvatar: React.Dispatch<React.SetStateAction<number>>
}

const Avatar = forwardRef<AvatarType, AvatarProps>(function Component(props, ref) {
  const { wrapperClass = '', avatar: _avatar = 0, round = true, ...rest } = props

  const [avatar, setAvatar] = useState<number | string>(_avatar)

  useImperativeHandle(
    ref,
    () => ({
      avatar,
      setAvatar,
    }),
    [avatar, setAvatar],
  )

  return (
    <Image {...rest} round className={classNames(styles['copy-btn'], `${wrapperClass}`)} src={avatarPics[avatar]} />
  )
})
export default memo(Avatar)
