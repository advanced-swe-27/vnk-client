// utility functions will go here
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as _ from 'lodash';

export function getInitials(fullName: string): string {
  const names = fullName.split(' ');

  if (names.length === 1) {
    // If there is only one name, use the first two letters
    return _.toUpper(_.take(names[0], 2).join(''));
  } else if (names.length === 2) {
    // If there are two names, use the first letter of each name
    return _.toUpper(_.map(names, name => name[0]).join(''));
  } else {
    // If there are three or more names, use the first letter of the first word
    // and the first letter of the last word
    return _.toUpper(`${names[0][0]}${names[names.length - 1][0]}`);
  }
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
