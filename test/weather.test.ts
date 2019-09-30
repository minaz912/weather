import mockAxios from 'axios'
import * as weather from '../src/utils/weather'

describe('getWeatherResult', () => {
  it('returns weather result messages based on given cities', async () => {
    const cities = ['Cairo', '10005', 'New York']

    const results = await weather.getWeatherResult(cities)

    expect(mockAxios.get).toHaveBeenCalledTimes(3)
    expect(mockAxios.get).toHaveBeenCalledWith('/weather', {
      params: {
        q: 'Cairo'
      }
    })
    expect(mockAxios.get).toHaveBeenCalledWith('/weather', {
      params: {
        zip: '10005'
      }
    })
    expect(mockAxios.get).toHaveBeenCalledWith('/weather', {
      params: {
        q: 'New York'
      }
    })

    expect(results).toMatchSnapshot()
  })
})
