import clsx from 'clsx';
import tailwindMerge from 'tailwind-merge';
import { randomUUID } from 'crypto';
// import moment from 'moment';

export function cn(...inputs: string[]) {
  return tailwindMerge(inputs.join(' '));
}

export function formatRelativeTime(isoString: string): string {
  // Use moment for more accurate results
  // const momentIsoString = moment(isoString);
  // return momentIsoString.fromNow();
  // For this simplified version, parse the ISO string directly
  const parts = isoString.split('-');
  const date = new Date(
    Number(parts[0]),
    Number(parts[1]),
    Number(parts[2])
  );
  const timeDiff = Math.floor((new Date() - date) / (1000 * 60));
  const seconds = Math.floor(timeDiff % 60);
  const minutes = Math.floor((timeDiff / 60) % 60);
  const hours = Math.floor((timeDiff / (60 * 60)) % 24);
  const days = Math.floor((timeDiff / (60 * 60 * 24)) % 31);
  if (timeDiff < 60 * 60 * 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export function truncate(str: string, len?: number): string {
  if (!str) return '';
  if (len === undefined || len < 0) return str;
  return str.substring(0, len);
}

export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str(0).toUpperCase() + str.slice(1);
}

export function generateId(): string {
  return randomUUID();
}