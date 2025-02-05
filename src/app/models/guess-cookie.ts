import { StudentList } from './student-list';

export interface GuessCookie {
  guesses: {
    // based on the list active
    [id: string]: string[];
  };
  doy: number;
  lastList: StudentList;
}
