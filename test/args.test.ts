import * as args from '../src/utils/args'

describe('categorize', () => {
  it('returns correct categorized obj for zipcode arg', () => {
    expect(args.categorize('11111')).toEqual({
      queryType: 'ZIP_CODE',
      queryValue: '11111'
    })
  })

  it('returns correct categorized obj for city name arg', () => {
    expect(args.categorize('Cairo')).toEqual({
      queryType: 'CITY_NAME',
      queryValue: 'Cairo'
    })
  })
})

describe('getArgList', () => {
  it('returns correctly split process args based on comma delimiter', () => {
    expect(args.getArgList(['Cairo,', '12345,', 'Tokyo'])).toEqual([
      'Cairo',
      '12345',
      'Tokyo'
    ])
  })

  it('handles args that include a space', () => {
    expect(args.getArgList(['Cairo,', 'New York'])).toEqual([
      'Cairo',
      'New York'
    ])
  })
})
