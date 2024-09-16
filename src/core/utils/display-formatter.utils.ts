export function removeAccents(str: string) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#form
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

export const simpleMatchText = (fullText: string, matchText: string) => {
  const fullTextNormalize = removeAccents(fullText.trim().toLowerCase())
  const matchTextNormalize = removeAccents(matchText.trim().toLowerCase())

  return fullTextNormalize.includes(matchTextNormalize)
}

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number)
}
