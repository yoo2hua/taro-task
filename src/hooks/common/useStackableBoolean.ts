import { useState } from 'react'

// 定义 Hook 的返回值类型
type UseToggleWithCountReturnType = {
	//
	isTrue: boolean
	setIsTrue: (value: boolean) => void
	reset: () => void
}

/**
 * useStackableBoolean Hook：用于创建一个可叠加true状态的boolean值。
 * @param initialValue 初始状态值，默认为 false
 * @returns 返回一个对象，包含当前状态、设置状态和重置状态的函数。
 */
const useStackableBoolean = (initialValue: boolean = false): UseToggleWithCountReturnType => {
	// 初始化计数器
	const [count, setCount] = useState<number>(initialValue === true ? 1 : 0)

	// 设置状态的函数
	const setIsTrue = (value: boolean) => {
		setCount(prevCount => Math.max(0, prevCount + (value ? 1 : -1)))
	}

	// 重置状态的函数
	const reset = () => {
		setCount(initialValue === true ? 1 : 0)
	}

	// 当计数器大于 0 时，状态为 true
	const isTrue = count > 0

	// 返回状态、设置状态和重置状态的函数
	return { isTrue, setIsTrue, reset }
}

export default useStackableBoolean
