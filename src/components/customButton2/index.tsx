// tsx
import { FC, memo, useState } from 'react'

import classNames from 'classnames'

import styles from './index.module.less'

type CustomButtonProps = {}

const CustomButton: FC<CustomButtonProps> = (props: CustomButtonProps) => {
  const {} = props
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div
      className={classNames(styles['checkbox-wrapper-39'], {})}
      onClick={() => {
        setIsChecked((pre) => !pre)
      }}
    >
      <label>
        <input
          type="checkbox"
          className={classNames({
            [styles['checked']]: isChecked,
          })}
        />
        <span className={styles['checkbox']}></span>
      </label>
    </div>
  )
}

export default memo(CustomButton)
