import {
  default as character_info,
  default as character_info_gl,
} from '../../../public/assets/character_info.json';
import { StudentData, StudentListData } from '../models/student';

export const getStudentListTestData = (): StudentListData => {
  return {
    japan: getJapanStudentTestData(),
    global: getGlobalStudentTestData(),
  };
};

export const getGlobalStudentTestData = (): StudentData => {
  return character_info_gl;
};

export const getJapanStudentTestData = (): StudentData => {
  return character_info;
};
