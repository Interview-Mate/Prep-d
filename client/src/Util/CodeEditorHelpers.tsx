import { intervalToDuration } from 'date-fns';

export const prettifyTime = (time: number) => {
  const duration = intervalToDuration({ start: 0, end: time });
  return duration.hours === 0
    ? duration.minutes === 0
      ? `${duration.seconds}s`
      : `${duration.minutes}m ${duration.seconds}s`
    : `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
};