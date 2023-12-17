import { FC, memo, useState } from 'react'

import classNames from 'classnames'

import styles from './index.module.less'

type CustomButtonProps = {}

const CustomButton: FC<CustomButtonProps> = (props: CustomButtonProps) => {
  const {} = props
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div
      className={styles['checkbox-wrapper-63']}
      onClick={() => {
        setIsChecked((pre) => !pre)
      }}
    >
      <label
        className={classNames(styles['switch'], {
          [styles['checked']]: isChecked,
        })}
      >
        {/* <input type={styles['checkbox']} /> */}
        <span className={styles['slider']}></span>
      </label>
    </div>
  )
}

export default memo(CustomButton)
