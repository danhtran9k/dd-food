const FLOWS_LIST = {
  gg: 'gg'
}

export const DEBUG_FLOW = FLOWS_LIST.gg

export const HIGHLIGHT_RED = {
  border: '1px solid red'
}

export const STYLE_BORDER_RED = {
  style: HIGHLIGHT_RED
}

export const highlight_color = (color = 'red') => ({
  border: `1px solid ${color}`
})

export const style_border = (color = 'red') => ({
  style: highlight_color(color)
})

export const twHighLightRed = 'border border-red-500 border-solid'

export const twHighLight = (color = 'red') =>
  `border border-solid border-${color}-500`

export const mapDefaultPortUrl = (url: string) => url?.replace(':4000', ':4999')

export const debugTimeStamps = (track: number | string, flow = '') => {
  if (flow === 'gg') {
    console.log(`🌊_${track} - ${new Date().toLocaleTimeString()}`)
  }
}
