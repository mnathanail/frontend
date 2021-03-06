import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-skill-item',
  templateUrl: './profile-skill-item.component.html',
  styleUrls: ['./profile-skill-item.component.css']
})
export class ProfileSkillItemComponent implements OnInit {
    @Input() skillItem: any;
    @Input() index: string;
    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }
}
