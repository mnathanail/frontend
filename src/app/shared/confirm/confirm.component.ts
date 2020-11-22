import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ConfirmService} from './service/confirm.service';
import {Subject, Subscription} from 'rxjs';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('modalcontent') content: ElementRef;
    showConfirm: string;
    subject: Subject<boolean>;

    constructor(config: NgbModalConfig,
                private modalService: NgbModal,
                private router: Router,
                private route: ActivatedRoute,
                private platformLocation: PlatformLocation,
                private confirmService: ConfirmService) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = true;
        platformLocation.onPopState(() => this.modalService.dismissAll());
    }

    ngOnInit(): void {

    }

    /* @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
         this.onClose();
     }*/


    onClose(): void {
        this.modalService.dismissAll();
    }

    ngAfterViewInit(): void {
        this.modalService.open(this.content);
    }

    ok(): void {
       this.route.parent.params.subscribe((param: Params) => {
            const id = +param.id;
            this.router.navigate([`profile/${param.id}`]);
        });
    }

    ngOnDestroy(): void {
        this.modalService.dismissAll();
    }
}
