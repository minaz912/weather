import map from 'lodash/fp/map'

import utils from './utils'
import { WeatherResult } from './types'

async function start(): Promise<void> {
  // first 2 args are irrelevant
  const args = process.argv.slice(2)

  if (args.length === 0) {
    utils.logging.showError(
      'No args passed, you need to pass at least 1 city name or zip code'
    )
    process.exit(1)
  }

  const cities = utils.args.getArgList(args)

  const weatherDetailsForCities = await utils.weather.getWeatherResult(cities)

  map((result: WeatherResult) =>
    utils.logging.showResult(
      result.name,
      utils.time.getPrettyDateWithTzOffset(result.timezoneOffsetInSeconds),
      result.weather
    )
  )(weatherDetailsForCities)

  console.log('--Done--')
  process.exit(0)
}

start()
