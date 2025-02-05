export interface Student {
  id: string;
  fullName: string;
  shortName: string;
  nativeName: string;
  school: string;
  damageType: string;
  armorType: string;
  role: string;
  combatClass: string;
  exSkillCost: number;
  positioning: string;
  height: number;
  outfit: string;
  releaseDate: string;
  weaponType: string;
  image: string;
  birthday: string;
  disabled: boolean;
}

export interface StudentData {
  [id: string]: Student;
}

export interface StudentListData {
  [list: string]: StudentData;
}
