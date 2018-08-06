const {expect} = require('chai')
const helper = require('../src/userinfo')

describe('helper functions', () => {
  describe('getRequestDays(days:number)', () => {
    it('returns the right types', () => {
      let output = helper.getRequestDates(3)
      expect(output).to.be.a('object')
      expect(output.startDate).to.be.a('string')
      expect(output.endDate).to.be.a('string')
    })
    it('calculates correct values', () => {
      let test = Math.ceil(Math.random() * 100)
      let output = helper.getRequestDates(test)
      let now = new Date()
      let then = new Date(now - 86400000 * test)
      // 86400000 = milliseconds in day
      expect(output.startDate).to.equal(then.toISOString())
      expect(output.endDate).to.equal(now.toISOString())
    })
    it('handles no argument', () => {
      let output = helper.getRequestDates()
      let theSameDate = new Date().toISOString()
      expect(output.startDate).to.equal(theSameDate)
      expect(output.endDate).to.equal(theSameDate)
      expect(new Date(output.startDate)).to.deep.equal(new Date(output.endDate))
    })
  })
})
