import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Canvas } from '@tarojs/components'
import Taro, { CanvasContext, NodesRef, useReady, useUnload } from '@tarojs/taro'

import styles from './index.module.less'

type ImageRenderProps = {
  canvasId?: string
}

type ImageRenderType = {}

const ImageRender = forwardRef<ImageRenderType, ImageRenderProps>(function Component(props, ref) {
  const { canvasId = `${parseInt(`${Math.random() * 1000}`)}` } = props

  const ctx = useRef<CanvasContext | null>(null)
  const arr = useRef<
    {
      red: number
      green: number
      blue: number
      apl: number
      x: number
      y: number
      r: number
    }[]
  >([])
  let canvasWH = useRef<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const getCanvasSize = () => {
    const query = Taro.createSelectorQuery()
    query
      .select('#canvas')
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        const dpr = Taro.getSystemInfoSync().pixelRatio
        const width = res?.width || 0
        const height = res?.height || 0
        console.log('🌊 ~ file: index.tsx:39 ~ .boundingClientRect:', { dpr, width, height })
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

    // 创建线性渐变
    // const gradient = ctx.current.createLinearGradient(0, 0, canvasWH.current.width, canvasWH.current.height)
    // gradient.addColorStop(0, 'red') // 起始颜色位置及颜色
    // gradient.addColorStop(1, 'blue') // 结束颜色位置及颜色

    const grd = ctx.current.createLinearGradient(0, 0, canvasWH.current.width, canvasWH.current.height)
    grd.addColorStop(0, 'red')
    grd.addColorStop(0.16, 'orange')
    grd.addColorStop(0.33, 'yellow')
    grd.addColorStop(0.5, 'green')
    grd.addColorStop(0.66, 'cyan')
    grd.addColorStop(0.83, 'blue')
    grd.addColorStop(1, 'purple')

    // Fill with gradient
    ctx.current.setFillStyle(grd)
    ctx.current.fillRect(0, 0, canvasWH.current.width, canvasWH.current.height)
    // ctx.current.draw(true)

    // 应用渐变作为背景
    // ctx.current.setFillStyle(gradient)
    // ctx.current.fillRect(10, 10, 150, 80)

    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.current.setStrokeStyle('#00ff00')
    // ctx.current.setLineWidth(5)
    // ctx.current.rect(0, 0, 200, 200)
    // ctx.current.stroke()
    // ctx.current.setStrokeStyle('#ff0000')
    // ctx.current.setLineWidth(2)
    // ctx.current.moveTo(160, 100)
    // ctx.current.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // ctx.current.moveTo(140, 100)
    // ctx.current.arc(100, 100, 40, 0, Math.PI, false)
    // ctx.current.moveTo(85, 80)
    // ctx.current.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // ctx.current.moveTo(125, 80)
    // ctx.current.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // ctx.current.stroke()
    // drawBubble()
    for (let i = 0; i < 10; i++) {
      addBubble()
    }
    ctx.current.draw(true)
    // const query = Taro.createSelectorQuery()
    // query.select('#canvas')
    //   .fields({ node: true, size: true })
    //   .exec((res) => {
    //     console.log("🌊 ~ file: index.tsx:61 ~ .exec ~ res:", res)
    //     const canvas = res[0].node
    //     console.log("🌊 ~ file: index.tsx:39 ~ .exec ~ canvas:", canvas)
    //     const ctx = canvas.getContext('2d')

    //     const dpr = Taro.getSystemInfoSync().pixelRatio
    //     canvas.width = res[0].width * dpr
    //     canvas.height = res[0].height * dpr
    //     ctx.scale(dpr, dpr)

    //     ctx.fillRect(0, 0, 100, 100)
    //   })
  }

  const addBubble = () => {
    const red = Math.round(Math.random() * 255)
    const green = Math.round(Math.random() * 255)
    const blue = Math.round(Math.random() * 255)
    const apl = Math.random()
    const x = Math.random() * canvasWH.current.width
    const y = Math.random() * canvasWH.current.height
    const r = Math.random() * 50
    const obj = {
      red,
      green,
      blue,
      apl,
      x: Math.max(x - r - 2, r + 2),
      y: Math.max(y - r - 2, r + 2),
      r,
    }
    arr.current.push(obj)
    drawBubbles()
  }

  const drawBubbles = () => {
    if (!ctx.current) return
    ctx.current?.clearRect(0, 0, canvasWH.current.width, canvasWH.current.height)

    arr.current.forEach((bubble) => {
      if (!ctx.current) return

      const color = `rgba(${bubble.red},${bubble.green},${bubble.blue},${bubble.apl})`
      // ctx.current.save()
      // ctx.current.fillStyle = color
      // ctx.current.beginPath()
      // ctx.current.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI)
      // ctx.current.fill()
      // ctx.current.restore()

      ctx.current.beginPath()
      ctx.current.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI, false)
      ctx.current.fillStyle = color
      ctx.current.fill()

      ctx.current.beginPath()
      ctx.current.arc(bubble.x, bubble.y, bubble.r + 2, 0, 2 * Math.PI, false)
      ctx.current.lineWidth = 1
      ctx.current.strokeStyle = color
      ctx.current.stroke()
    })
  }

  useImperativeHandle(ref, () => ({}), [])

  useReady(() => {
    getCanvasSize()
  })
  useUnload(() => {
    console.log('🌊 ~ file: index.tsx:171 ~ useUnload ~ useUnload:')
    ctx.current = null
    // @ts-ignore
    canvasWH.current = null
  })

  return (
    <Canvas
      id="canvas"
      canvasId={canvasId}
      className={styles['canvas']}
      // disableScroll
      // onTouchStart={canvasStart}
      // onTouchMove={canvasMove}
      // onTouchEnd={canvasEnd}
      // onTouchCancel={canvasEnd}
    ></Canvas>
  )
})

export default ImageRender
