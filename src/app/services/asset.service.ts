import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor() {}

  getRoleImage(role: string): string {
    switch (role) {
      case 'Attacker':
        return 'assets/images/roles/Icon_role_attacker.webp';
      case 'Support':
        return 'assets/images/roles/Icon_role_support.webp';
      case 'Healer':
        return 'assets/images/roles/Icon_role_healer.webp';
      case 'Tank':
        return 'assets/images/roles/Icon_role_tank.webp';
      case 'Tactical Support':
        return 'assets/images/roles/Icon_role_tactical_support.webp';
      default:
        return 'assets/images/schools/unkown.png';
    }
  }

  getSchoolImage(school: string): string {
    switch (school) {
      case 'Abydos':
        return 'assets/images/schools/50px-Abydos.webp';
      case 'Arius':
        return 'assets/images/schools/50px-Arius.webp';
      case 'Gehenna':
        return 'assets/images/schools/50px-Gehenna.webp';
      case 'Hyakkiyako':
        return 'assets/images/schools/50px-Hyakkiyako.webp';
      case 'Millennium':
        return 'assets/images/schools/50px-Millennium.webp';
      case 'Red Winter':
        return 'assets/images/schools/50px-Red_Winter.webp';
      case 'Shanhaijing':
        return 'assets/images/schools/50px-Shanhaijing.webp';
      case 'SRT':
        return 'assets/images/schools/50px-SRT.webp';
      case 'Trinity':
        return 'assets/images/schools/50px-Trinity.webp';
      case 'Valkyrie':
        return 'assets/images/schools/50px-Valkyrie.webp';
      default:
        return 'assets/images/schools/unkown.png';
    }
  }
}
