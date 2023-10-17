import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivityItem } from './activity';
import { TmplAstBoundAttribute } from '@angular/compiler';


@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent {

  public activity: ActivityItem[] = [];  

  constructor( private readonly router: Router){

    for(let h = 0; h < 10; h++){
      this.activity.push({
        name: "Bob",
        description: "Blablablablabal",
        time: "10.11.2023",
        isDone: true
      })
    }    

  }
  
  
}
