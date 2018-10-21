export default function(amount) {
  Intl = require('intl')
  require('intl/locale-data/jsonp/pl')
  const options = {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
  }
  if (amount % 100 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat('pl-PL', options)
  return formatter.format(amount / 100)
}
