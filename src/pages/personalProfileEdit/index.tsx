/**
 * 个人资料编辑
 */
import { useEffect, useRef } from 'react'

import { Input } from '@tarojs/components'
import { createSelectorQuery } from '@tarojs/taro'

import classNames from 'classnames'

import Avatar, { AvatarType } from '@/components/avatar'
import ChangeAvatarDialog, { ChangeAvatarDialogType } from '@/components/changeAvatarDialog'
import IconFont from '@/components/iconfont'
import ImageRender from '@/components/imageRender'
import Ribbon from '@/components/ribbon'
import Signature from '@/components/signature'

import { useAppSelector } from '@/hooks/redux'

import { naviBack } from '@/routes/navigator.provider'
import { NavBar } from '@antmjs/vantui'

import styles from './index.module.less'

const PersonalProfileEdit = () => {
  // const dispatch = useAppDispatch()
  const { avatar, nick_name } = useAppSelector((state) => state.user)
  const changeAvatarDialogRef = useRef<ChangeAvatarDialogType>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const avatarRef = useRef<AvatarType>(null)

  const onSubmit = () => {
    createSelectorQuery()
      .select('#nickname-input')
      .fields({
        properties: ['value'],
      })
      .exec(async (res) => {
        const val = res[0].value
        console.log('🌊 ~ file: index.tsx:38 ~ .exec ~ val:', val)
      })
  }

  const init = () => {
    if (!inputRef.current) return

    inputRef.current.value = nick_name
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={styles['personal-profile-edit__page']}>
      <NavBar
        leftText={<IconFont name="line-back" />}
        onClickLeft={() => {
          naviBack()
        }}
        className={styles['nav-bar']}
        title="个人资料编辑"
        border={false}
      />
      {/* <Signature /> */}
      {/* <div className={styles['image-render__box']}>
        <ImageRender />
      </div>
      <div className={styles['image-render__box']}>
        <ImageRender />
      </div> */}

      {/* <div className={styles['image-render__box']}>
        <Ribbon />
      </div> */}
      <div className={styles['main']}>
        <div className={styles['card']}>
          <div className={styles['card__content']}>
            <div className={styles['title']}>编辑</div>
            <div className={classNames(styles['avatar__wrapper'], styles['edit-item__wrapper'])}>
              <Avatar wrapperClass={styles['avatar']} ref={avatarRef} avatar={avatar} />
              <div
                className={styles['edit']}
                onClick={() => {
                  changeAvatarDialogRef?.current?.open(avatarRef?.current?.avatar as number)
                }}
              >
                <IconFont name="line-edit" />
              </div>
            </div>
            <div className={classNames(styles['nickname__wrapper'], styles['edit-item__wrapper'])}>
              <Input
                ref={inputRef}
                id="nickname-input"
                className={styles['nickname__input']}
                placeholder="请输入昵称"
                type="nickname"
              />
            </div>
          </div>
          <div className={styles['card__footer']}>
            <div className={styles['editor__submit']} onClick={onSubmit}>
              提 交
            </div>
          </div>
        </div>
      </div>
      <ChangeAvatarDialog
        ref={changeAvatarDialogRef}
        avatar={avatarRef?.current?.avatar as number}
        successCallback={(val) => {
          avatarRef?.current?.setAvatar(val)
        }}
      />
    </div>
  )
}

export default PersonalProfileEdit
