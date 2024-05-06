import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor() {}

  getRoleImage(role: string): string {
    switch (role) {
      case 'Attacker':
        return 'assets/images/roles/Icon_role_attacker.png';
      case 'Support':
        return 'assets/images/roles/Icon_role_support.png';
      case 'Healer':
        return 'assets/images/roles/Icon_role_healer.png';
      case 'Tank':
        return 'assets/images/roles/Icon_role_tank.png';
      case 'Tactical Support':
        return 'assets/images/roles/Icon_role_tactical_support.png';
      default:
        return 'assets/images/schools/unkown.png';
    }
  }

  getSchoolImage(school: string): string {
    switch (school) {
      case 'Abydos':
        return 'assets/images/schools/50px-Abydos.png';
      case 'Arius':
        return 'assets/images/schools/50px-Arius.png';
      case 'Gehenna':
        return 'assets/images/schools/50px-Gehenna.png';
      case 'Hyakkiyako':
        return 'assets/images/schools/50px-Hyakkiyako.png';
      case 'Millennium':
        return 'assets/images/schools/50px-Millennium.png';
      case 'Red Winter':
        return 'assets/images/schools/50px-Red_Winter.png';
      case 'Shanhaijing':
        return 'assets/images/schools/50px-Shanhaijing.png';
      case 'SRT':
        return 'assets/images/schools/50px-SRT.png';
      case 'Trinity':
        return 'assets/images/schools/50px-Trinity.png';
      case 'Valkyrie':
        return 'assets/images/schools/50px-Valkyrie.png';
      default:
        return 'assets/images/schools/unkown.png';
    }
  }
}
