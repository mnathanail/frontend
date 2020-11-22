import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-skill-list',
  templateUrl: './profile-skill-list.component.html',
  styleUrls: ['./profile-skill-list.component.css']
})
export class ProfileSkillListComponent implements OnInit {

    skills: any[] = [];

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

  ngOnInit(): void {
        this.skills.push(
           'Java', 'PHP', 'JSP'
        );
  }

    onAddSkill(): void {
        this.router.navigate(['edit/edit-skills-profile'], {relativeTo: this.route});
    }
}
