import { StudentList } from './student-list';

export interface GuessCookie {
  guesses: Record<string, string[]>;
  doy: number;
  lastList: StudentList;
}

export interface ChangeLogCookie {
  // Contains the date of the last time the change log was read
  // Format YYYY/MM/DD
  changeLogReadDate?: string;
}
