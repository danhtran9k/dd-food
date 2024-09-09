export const drawQrTableBackground = (
  canvas: HTMLCanvasElement,
  tableNumber: number,
  size: number,
  offsetHeight = 70
) => {
  const width = size
  const center = width / 2
  const height = size + offsetHeight

  canvas.width = width
  canvas.height = height

  // Bước fill sẽ đè lên toàn bộ canvas
  const canvasContext = canvas.getContext('2d')!
  canvasContext.fillStyle = '#fff'
  canvasContext.fillRect(0, 0, width, height)

  canvasContext.font = '20px Arial'
  canvasContext.textAlign = 'center'
  canvasContext.fillStyle = '#000'
  canvasContext.fillText(`Bàn số ${tableNumber}`, center, width + 20)
  canvasContext.fillText(`Quét mã QR để gọi món`, center, width + 50)
}
