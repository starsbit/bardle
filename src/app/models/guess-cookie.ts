import { StudentList } from './student-list';

export interface GuessCookie {
  guesses: Record<string, string[]>;
  doy: number;
  lastList: StudentList;
}
