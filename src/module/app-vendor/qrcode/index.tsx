'use client'

import QRCode from 'qrcode'
import { useEffect, useRef } from 'react'

import { getTableLink } from '@app/api-next/tables/tables.utils'

interface QRCodeTableProps {
  token: string
  tableNumber: number
  width?: number
}

export function QRCodeTable({ token, tableNumber }: QRCodeTableProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    QRCode.toCanvas(
      canvas,
      getTableLink({
        token,
        tableNumber
      }),
      function (error) {
        if (error) console.error(error)
        console.log('success!')
      }
    )
  }, [token, tableNumber])

  return <canvas ref={canvasRef} />
}
