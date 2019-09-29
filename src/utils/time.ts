import moment from 'moment-timezone';

export function getPrettyDateWithTzOffset(utcOffsetInSeconds?: number): string {
  return utcOffsetInSeconds
    ? moment()
        .utcOffset(utcOffsetInSeconds / 60)
        .format('LLL')
    : 'N/A';
}
