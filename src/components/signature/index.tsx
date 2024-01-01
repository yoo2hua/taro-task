import { useEffect, useState } from 'react'

import { Button, Canvas, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.less'

let ctx: any
let startX = 0
let startY = 0
let canvasW = 0
let canvasH = 0

const Signature = () => {
  const [isPaint, setIsPaint] = useState(false)
  const [tempFilePath, setTempFilePath] = useState('')
  const [color, setColor] = useState('#000')
  const colorList = [
    { name: 'red', value: '#ff1132' },
    { name: 'green', value: '#4fcd56' },
    { name: 'yellow', value: '#ffd767' },
    { name: 'blue', value: '#0883d8' },
    { name: 'black', value: '#000' },
    { name: 'pink', value: '#ff6899' },
  ]

  useEffect(() => {
    setTimeout(() => {
      getCanvasSize()
    }, 200)
    initCanvas()
    return () => {
      ctx = null
    }
  }, [])

  const initCanvas = () => {
    ctx = Taro.createCanvasContext('canvas', this)
    ctx.setStrokeStyle(color)
    ctx.setLineWidth(4)
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
  }

  const canvasStart = (e: any) => {
    startX = e.changedTouches[0].x
    startY = e.changedTouches[0].y
    ctx.beginPath()
  }

  const canvasMove = (e: any) => {
    if (startX !== 0) {
      setIsPaint(true)
    }
    const x = e.changedTouches[0].x
    const y = e.changedTouches[0].y
    ctx.moveTo(startX, startY)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.draw(true)
    startX = x
    startY = y
  }

  const canvasEnd = (e: any) => {
    // console.log('结束');
  }

  const clearDraw = () => {
    setIsPaint(false)
    setTempFilePath('')
    startX = 0
    startY = 0
    ctx.clearRect(0, 0, canvasW, canvasH)
    ctx.draw(true)
  }

  const createImg = () => {
    if (!isPaint) {
      Taro.showToast({
        title: '签名内容不能为空！',
        icon: 'none',
      })
      return false
    }
    Taro.canvasToTempFilePath({
      canvasId: 'canvas',
      success: (res) => {
        setTempFilePath(res.tempFilePath)
      },
      fail(err) {
        console.log(err)
      },
    })
  }

  const getCanvasSize = () => {
    const query = Taro.createSelectorQuery()
    query
      .select('#canvas')
      .boundingClientRect((res) => {
        canvasW = res.width
        canvasH = res.height
      })
      .exec()
  }

  const colorEvent = (value: string) => {
    setColor(value)
    initCanvas()
  }

  return (
    <View className="signature">
      <View className="canvas-box">
        <Canvas
          id="canvas"
          canvasId="canvas"
          className="canvas"
          disableScroll
          onTouchStart={canvasStart}
          onTouchMove={canvasMove}
          onTouchEnd={canvasEnd}
          onTouchCancel={canvasEnd}
        ></Canvas>
      </View>

      <View className="color">
        {colorList.map((item) => (
          <View
            key={item.value}
            className="item"
            style={{ backgroundColor: item.value }}
            onClick={() => colorEvent(item.value)}
          ></View>
        ))}
      </View>
      <View>
        当前颜色：
        <View
          style={{
            backgroundColor: color,
            width: '60px',
            height: '60px',
          }}
        ></View>
      </View>
      <View className="layout-flex buttons">
        <Button className="cancel" onClick={clearDraw}>
          清除
        </Button>
        <Button className="confirm" onClick={createImg}>
          提交
        </Button>
      </View>

      <View>图片路径：</View>
      <View className="word-break">{tempFilePath}</View>
    </View>
  )
}

export default Signature
