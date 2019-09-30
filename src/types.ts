export interface CategorizedArg {
  queryType: 'CITY_NAME' | 'ZIP_CODE'
  queryValue: string
}

export interface RequestMetadata {
  queryValue: string
  endpoint: string
  params: { q: string } | { zip: string }
}

export interface WeatherResult {
  name: string
  weather: string | null
  timezoneOffsetInSeconds: number | null
}

export interface OWMAPIResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  id: number
  name: string
  cod: number
  timezone: number
}

interface Sys {
  type: number
  id: number
  message: number
  country: string
  sunrise: number
  sunset: number
}

interface Clouds {
  all: number
}

interface Wind {
  speed: number
  deg: number
}

interface Main {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Coord {
  lon: number
  lat: number
}
