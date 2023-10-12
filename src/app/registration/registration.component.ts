import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor( private readonly router: Router){

  }
  public openLogin(): void {
    this.router.navigateByUrl("login");
  }
}
