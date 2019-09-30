import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios'

import * as args from './args'

import { CategorizedArg, RequestMetadata, WeatherResult } from '../types'

class OpenWeatherMapAPIManager {
  static fetcher = axios.create({
    // ideally here we would separate the api version from the base url
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
      // TODO: handle missing env variable
      APPID: process.env.OWM_APPID,
      units: 'metric'
    }
  })
}

function getRequestMetadata(queryMetadata: CategorizedArg): RequestMetadata {
  const { queryType, queryValue } = queryMetadata
  if (queryType === 'ZIP_CODE') {
    return {
      queryValue,
      endpoint: '/weather',
      params: {
        // OWM expects the zip code to be passed in a 'zip' query arg
        // ref: https://openweathermap.org/current#zip
        zip: queryValue
      }
    }
  }
  if (queryType === 'CITY_NAME') {
    return {
      queryValue,
      endpoint: '/weather',
      params: {
        // OWM expects the city name to be passed in a 'q' query arg
        // ref: https://openweathermap.org/current#name
        q: queryValue
      }
    }
  }

  throw new Error('Invalid metadata')
}

function getWeatherFromApi(requestMetadata: RequestMetadata): AxiosPromise {
  const { endpoint, params } = requestMetadata
  return OpenWeatherMapAPIManager.fetcher.get(endpoint, {
    params
  })
}

function generateWeatherMessage(
  apiResult: AxiosResponse | AxiosError,
  requestMetadata: RequestMetadata
): WeatherResult {
  if (apiResult instanceof Error) {
    return {
      name: requestMetadata.queryValue,
      weather: apiResult.response.data.message,
      timezoneOffsetInSeconds: null
    }
  }

  const {
    data: { name, weather, main, timezone }
  } = apiResult
  return {
    name,
    weather: `${weather[0].main}, ${main.temp} Celsius`,
    timezoneOffsetInSeconds: timezone
  }
}

export async function getWeatherResult(
  cities: string[]
): Promise<WeatherResult[]> {
  // try {
  const categorizedRequestMetadata = map((arg: string) =>
    flow(
      args.categorizeCityArg,
      getRequestMetadata
    )(arg)
  )(cities)

  return Promise.all(
    categorizedRequestMetadata.map(metadata =>
      getWeatherFromApi(metadata)
        .then(response => generateWeatherMessage(response, metadata))
        .catch(err => generateWeatherMessage(err, metadata))
    )
  )
}
