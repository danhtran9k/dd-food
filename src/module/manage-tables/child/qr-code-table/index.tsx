'use client'

import { useEffect, useRef } from 'react'

import { getTableLink } from '@app/api-next/tables/tables.utils'

import { createQrVirtualCanvas } from '@module/app-vendor/qrcode-table'

import { drawQrTableBackground } from './qr-tables.utils'

interface QRCodeTableProps {
  token: string
  tableNumber: number
  width?: number
}

export default function QRCodeTable({
  token,
  tableNumber,
  width = 250
}: QRCodeTableProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // fill qr background and text
    // Vì khi fill table sẽ override toàn bộ canvas
    // phải fill trước rồi vẽ đè qr (canvas ảo) lên sau
    drawQrTableBackground(canvas, tableNumber, width)

    const contentQr = getTableLink({
      token,
      tableNumber
    })
    const options = {
      width,
      margin: 4
    }

    createQrVirtualCanvas(contentQr, options).then((virtualCanvas) => {
      if (!virtualCanvas) return
      const canvasContext = canvas.getContext('2d')!
      canvasContext.drawImage(virtualCanvas, 0, 0, width, width)
    })
  }, [token, width, tableNumber])
  return <canvas ref={canvasRef} />
}
