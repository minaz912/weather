import moment from 'moment-timezone';

export default function getPrettyDateWithTzOffset(
  utcOffsetInSeconds: number
): string {
  return moment()
    .utcOffset(utcOffsetInSeconds / 60)
    .format('LLL');
}
