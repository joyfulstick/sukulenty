/* eslint-disable */
import formatMoney from '../lib/formatMoney'

xdescribe('formatMoney Function', () => {
  it('wokrs with fractionls Polish zloty', () => {
    expect(formatMoney(1)).toEqual('0,01 zł')
  })

  it('leaves grosze off for whole zloty', () => {
    expect(formatMoney(100)).toEqual('1 zł')
  })

  it('works with whole and fractional zloty', () => {
    expect(formatMoney(112)).toEqual('1,12 zł')
  })
})
