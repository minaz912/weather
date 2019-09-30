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
