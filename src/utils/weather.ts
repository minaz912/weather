import axios, { AxiosPromise, AxiosResponse } from 'axios'

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

export function getRequestMetadata(
  queryMetadata: CategorizedArg
): RequestMetadata {
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

function getCityDetailsFromAPIResponse(
  response: AxiosResponse
): {
  name: string
  weather: string
  timezoneOffsetInSeconds: number
} {
  const {
    data: { name, weather, main, timezone }
  } = response
  return {
    name,
    weather: `${weather[0].main}, ${main.temp} Celsius`,
    timezoneOffsetInSeconds: timezone
  }
}

export async function getWeatherResult(
  requestMetadata: RequestMetadata
): Promise<WeatherResult> {
  try {
    const weatherApiResponse = await getWeatherFromApi(requestMetadata)
    return getCityDetailsFromAPIResponse(weatherApiResponse)
  } catch (err) {
    return {
      name: requestMetadata.queryValue,
      weather: err.response.data.message,
      timezoneOffsetInSeconds: null
    }
  }
}
