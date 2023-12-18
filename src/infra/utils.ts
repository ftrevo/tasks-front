export const currencyFormatter = (value?: number | string) => {
  if (value === null || value === undefined) return ''
  const amountStr = value.toString().padStart(3, '0')
  return amountStr.replace(/(\d+)(\d{2})$/, '$1.$2€')
}

export const HOST = 'https://tasks-back-755253d31995.herokuapp.com'
