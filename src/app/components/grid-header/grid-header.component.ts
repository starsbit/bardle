/* eslint-disable @typescript-eslint/class-literal-property-style */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridHeaderElementComponent } from './grid-header-element/grid-header-element.component';

@Component({
  selector: 'ba-grid-header',
  imports: [GridHeaderElementComponent],
  templateUrl: './grid-header.component.html',
  styleUrl: './grid-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridHeaderComponent {
  get student() {
    return $localize`:Student|Header for student grid@@StudentGrid:Student`;
  }

  get school() {
    return $localize`:School|Header for school grid@@SchoolGrid:School`;
  }

  get role() {
    return $localize`:Role|Header for role grid@@RoleGrid:Role`;
  }

  get damageType() {
    return $localize`:Damage Type|Header for damage type grid@@DamageTypeGrid:Damage Type`;
  }

  get armorType() {
    return $localize`:Armor Type|Header for armor type grid@@ArmorTypeGrid:Armor Type`;
  }

  get exSkillCost() {
    return $localize`:Ex Skill Cost|Header for ex skill cost grid@@ExSkillCostGrid:Ex Skill Cost`;
  }

  get birthday() {
    return $localize`:Birthday|Header for birthday grid@@BirthdayGrid:Birthday`;
  }

  get releaseDate() {
    return $localize`:Release Date|Header for release date grid@@ReleaseDateGrid:Release Date`;
  }

  get weaponType() {
    return $localize`:Weapon Type|Header for weapon type grid@@WeaponTypeGrid:Weapon Type`;
  }
}
