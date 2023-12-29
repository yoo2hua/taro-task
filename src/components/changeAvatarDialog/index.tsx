import { forwardRef, useImperativeHandle, useState } from 'react'

import { View } from '@tarojs/components'

import classNames from 'classnames'
import { isNil } from 'lodash-es'

import useBoolean from '@/hooks/utils/useBoolean'

import { splitArrayIntoChunks } from '@/utils/index'

import { Button, Popup } from '@antmjs/vantui'

import styles from './index.module.less'

import Avatar from '../avatar'

export interface ChangeAvatarDialogType {
  open: (avatar?: number) => void
  close: () => void
}
export interface ChangeAvatarDialogProps {
  avatar?: number
  setLoading?: (loading: boolean) => void
  successCallback?: (avatar: number) => void
}

const avatars = Array.from({ length: 7 }, (v, k) => k)

const ChangeAvatarDialog = forwardRef<ChangeAvatarDialogType, ChangeAvatarDialogProps>(function Dialog(
  { avatar = 0, successCallback },
  ref: React.ForwardedRef<ChangeAvatarDialogType>,
) {
  const [visible, { setTrue: setShow, setFalse: close }] = useBoolean(false)
  const [avatarVal, setAvatarVal] = useState<number>(avatar)

  const open = (avatar: number) => {
    setShow()
    if (!isNil(avatar)) {
      setAvatarVal(avatar)
    }
  }

  const save = () => {
    successCallback?.(avatarVal)
    close()
  }

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  return (
    <Popup show={visible} onClose={close} round closeIconPosition="top-right">
      <View catchMove className={styles['dialog__box']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['dialog__header']}>
          <p className={styles['title']}>更换头像</p>
        </div>
        <div className={styles['dialog__content']}>
          {splitArrayIntoChunks(avatars, 3).map((chunk) => {
            return (
              <div className={styles['row']}>
                {chunk.map((i) => {
                  return (
                    <Avatar
                      wrapperClass={classNames(styles['image'], {
                        [styles['image--active']]: avatarVal === i,
                      })}
                      avatar={i}
                      key={i}
                      onClick={() => {
                        setAvatarVal(i)
                      }}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className={styles['dialog__footer']}>
          <div className={styles['btn__wrapper']}>
            <Button size="small" className={styles['button']} hairline onClick={close}>
              取消
            </Button>
            <Button size="small" className={styles['button']} type="primary" onClick={save}>
              确定
            </Button>
          </div>
        </div>
      </View>
    </Popup>
  )
})

export default ChangeAvatarDialog
