import { NON_EVENT_SCHOOLS } from '../constants/rules';

export const sanitizeBirthday = (birthday: string): string => {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (regex.test(birthday)) {
    const [year, month, day] = birthday.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return birthday;
    }
  }
  return '';
};

export const sanitizeSchool = (school: string): string => {
  for (const nonEventSchool of NON_EVENT_SCHOOLS) {
    if (school === nonEventSchool) {
      return school;
    }
  }
  return 'Unknown';
};
