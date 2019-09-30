import flow from 'lodash/fp/flow'
import { CategorizedArg } from '../types'

export function categorize(arg: string): CategorizedArg {
  return !Number.isNaN(Number(arg))
    ? { queryType: 'ZIP_CODE', queryValue: arg }
    : { queryType: 'CITY_NAME', queryValue: arg }
}

function join(str: string[]): string {
  return str.join('')
}

function trim(str: string): string {
  return str.trim()
}

function split(str: string): string[] {
  return str.split(',')
}

export function getArgList(processArgs: string[]): string[] {
  return flow(
    join,
    trim,
    split
  )(processArgs)
}
