import { GuessCookie } from './guess-cookie';
import { StudentListData } from './student';
import { StudentList } from './student-list';

export interface GameResult {
  // based on the list active
  [id: string]: {
    won?: boolean;
    lost?: boolean;
  };
}

export interface GameAnswer {
  // based on the list active
  [id: string]: string;
}

export interface GameState {
  guesses: GuessCookie;
  result: GameResult;
  answer: GameAnswer;
  yesterdayAnswer: GameAnswer;
  activeList: StudentList;
  students: StudentListData;
}
