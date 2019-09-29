import { CategorizedArg } from '../types';

export function categorizeCityArg(arg: string): CategorizedArg {
  return !Number.isNaN(Number(arg))
    ? { queryType: 'ZIP_CODE', queryValue: arg }
    : { queryType: 'CITY_NAME', queryValue: arg };
}

// FIXME: handle city names that include spaces
export function parseCityArg(arg: string): string {
  // if the arg ends in ',', discard the ','
  return arg[arg.length - 1] === ',' ? arg.slice(0, arg.length - 1) : arg;
}
