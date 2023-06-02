export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  minimumFractionDigits: 0
})

export const usdExactFormatter = {
  format: (value: number , format='en-US', currency = 'USD' ) : string => {
    return new Intl.NumberFormat(format, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,500.99)  
      minimumFractionDigits: 0
    }).format(value) 
  }
}