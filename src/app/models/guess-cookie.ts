import { StudentList } from './student-list';

export interface GuessCookie {
  guesses: {
    [key in StudentList]: string[];
  };
  doy: number;
}
