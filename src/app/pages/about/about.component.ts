import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ba-about',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
