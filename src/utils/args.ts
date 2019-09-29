import { CategorizedArg } from '../types';

export function categorizeCityArg(arg: string): CategorizedArg {
  return arg.length >= 5 && arg.length <= 6 && !isNaN(Number(arg))
    ? { queryType: 'ZIP_CODE', queryValue: arg }
    : { queryType: 'CITY_NAME', queryValue: arg };
}

export function parseCityArg(arg: string): string {
  // if the arg ends in ',', discard the ','
  return arg[arg.length - 1] === ',' ? arg.slice(0, arg.length - 1) : arg;
}
