/**
 * 我的任务下拉菜单
 */
import { FC } from 'react'

import { DropdownItem, DropdownMenu } from '@antmjs/vantui'

import styles from './index.module.less'

import { myTaskTypeEnum, sortEnum } from '../../constants'
import { DropdownMenuParams } from '../../types'
import { mapDropdownMenuOption } from '../../utils'

type MyTaskDropdownProps = {
  dropdownMenuParams: DropdownMenuParams
  setDropdownMenuParams: React.Dispatch<React.SetStateAction<DropdownMenuParams>>
  getList: (params?: Partial<DropdownMenuParams>) => void
}

const dropdownItems = [
  { key: 'taskType', enum: myTaskTypeEnum.$options() },
  { key: 'sort', enum: sortEnum.$options() },
]

const MyTaskDropdown: FC<MyTaskDropdownProps> = (props) => {
  const { dropdownMenuParams, setDropdownMenuParams, getList } = props

  return (
    <DropdownMenu direction="down" className={styles['menu']}>
      {dropdownItems.map((item) => {
        return (
          <DropdownItem
            value={dropdownMenuParams[item.key]}
            options={mapDropdownMenuOption(item?.enum)}
            onChange={(val: number) => {
              setDropdownMenuParams((pre) => ({ ...pre, [item.key]: val }))
              getList({
                [item.key]: val,
              })
            }}
          />
        )
      })}
    </DropdownMenu>
  )
}

export default MyTaskDropdown
