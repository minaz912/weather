import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'

import utils from './utils'

async function start(): Promise<void> {
  // first 2 args are irrelevant
  const args = process.argv.slice(2)

  if (args.length === 0) {
    utils.logging.showError(
      'No args passed, you need to pass at least 1 city name or zip code'
    )
    process.exit(1)
  }

  const categorizedRequestMetadata = map((arg: string) =>
    flow(
      utils.args.parseCityArg,
      utils.args.categorizeCityArg,
      utils.weather.getRequestMetadata
    )(arg)
  )(args)

  await Promise.all(
    categorizedRequestMetadata.map(async reqMetadata => {
      const weatherResult = await utils.weather.getWeatherResult(reqMetadata)
      utils.logging.showResult(
        weatherResult.name,
        utils.time.getPrettyDateWithTzOffset(
          weatherResult.timezoneOffsetInSeconds
        ),
        weatherResult.weather
      )
    })
  )

  console.log('Done')
  process.exit(0)
}

start()
