import QRCode, { QRCodeRenderersOptions } from 'qrcode'

export const createQrVirtualCanvas = async (
  contentQr: string,
  options?: QRCodeRenderersOptions
) => {
  const virtualCanvas = document.createElement('canvas')
  try {
    await QRCode.toCanvas(virtualCanvas, contentQr, { ...options })
    return virtualCanvas
  } catch (error) {
    console.error(error)
  }
}
