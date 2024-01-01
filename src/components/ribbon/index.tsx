import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Canvas } from '@tarojs/components'
import Taro, { CanvasContext, NodesRef, useReady } from '@tarojs/taro'

import styles from './index.module.less'

type RibbonProps = {
  canvasId?: string
}

type RibbonType = {}

const size = 10 // 默认值

// 创建 Canvas 元素
const f = size // 设置线条的宽度
const pi = Math.PI * 2 // 圆周率 * 2
const cos = Math.cos // 余弦函数
const random = Math.random // 随机数生成函数

const Ribbon = forwardRef<RibbonType, RibbonProps>(function Component(props, ref) {
  const { canvasId = `${parseInt(`${random() * 1000}`)}` } = props

  const ctx = useRef<CanvasContext | null>(null)

  let canvasWH = useRef<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  let q = useRef<
    {
      x: number
      y: number
    }[]
  >([])

  let t = useRef<number>(0)
  let r = 0

  const getCanvasSize = () => {
    const query = Taro.createSelectorQuery()
    query
      .select('#canvas')
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        const width = res?.width || 0
        const height = res?.height || 0
        canvasWH.current = {
          width,
          height,
        }
        initCanvas()
      })
      .exec()
  }

  const initCanvas = () => {
    ctx.current = Taro.createCanvasContext(canvasId)
    redraw()
  }

  // 重绘函数
  function redraw() {
    const { width, height } = canvasWH.current
    ctx.current?.clearRect(0, 0, width, height)

    q.current = [
      { x: 0, y: height * 0.7 + f }, // 起始点1
      { x: 0, y: height * 0.7 - f }, // 起始点2
    ]

    // drawBackground()
    while (q.current[1]?.x < width + f) {
      draw(q.current[0], q.current[1]) // 绘制线条
    }

    ctx.current?.draw()
  }

  function draw(i: { x: number; y: number }, j: { x: number; y: number }) {
    if (!ctx.current) return

    ctx.current?.beginPath()
    ctx.current?.moveTo(i.x, i.y) // 移动到起始点1
    ctx.current?.lineTo(j.x, j.y) // 绘制直线到起始点2
    const k = j.x + (random() * 2 - 0.25) * f // 随机生成下一个点的x坐标
    const n = line(j.y) // 生成下一个点的y坐标
    ctx.current?.lineTo(k, n) // 绘制直线到第三个点
    ctx.current?.closePath()

    r -= pi / -50 // 更新角度

    const color = `#${(
      ((cos(r) * 127 + 128) << 16) | // 计算红色通道
      ((cos(r + pi / 3) * 127 + 128) << 8) | // 计算绿色通道
      (cos(r + (pi / 3) * 2) * 127 + 128)
    )
      .toString(16)
      .padStart(6, '0')}` // 计算蓝色通道，并转换为十六进制颜色值

    ctx.current.setFillStyle(color) // 设置填充颜色

    ctx.current?.fill() // 填充路径
    q.current[0] = q.current[1]
    q.current[1] = { x: k, y: n } // 更新起始点为刚绘制的点
  }

  // 线函数
  function line(p: number) {
    const { height } = canvasWH.current
    const val = p + (random() * 2 - 1.1) * f // 随机生成下一个点的y坐标
    t.current = val
    return t.current > height || t.current < 0 ? line(p) : t.current // 如果超出画布高度，则重新生成y坐标
  }

  const drawBackground = () => {
    if (!ctx.current) return
    const { width, height } = canvasWH.current
    const grd = ctx.current?.createLinearGradient(0, 0, width, 0)

    // grd.addColorStop(0, 'red')
    // grd.addColorStop(0.16, 'orange')
    // grd.addColorStop(0.33, 'yellow')
    // grd.addColorStop(0.5, 'green')
    // grd.addColorStop(0.66, 'cyan')
    // grd.addColorStop(0.83, 'blue')
    // grd.addColorStop(1, 'purple')

    grd.addColorStop(0.23, 'rgba(255, 215, 185, 0.91)')
    grd.addColorStop(0.93, 'rgba(223, 159, 247, 0.8)')

    ctx.current.setFillStyle(grd)
    ctx.current.fillRect(0, 0, width, height)
  }
  useReady(() => {
    getCanvasSize()
  })

  useImperativeHandle(ref, () => ({}), [])

  return <Canvas id="canvas" canvasId={canvasId} className={styles['canvas']}></Canvas>
})

export default Ribbon
