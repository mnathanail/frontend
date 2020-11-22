import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CanComponentDeactivate} from '../../../guard/can-deactivate';
import {Observable, Subscription} from 'rxjs';
import {LocationStrategy} from '@angular/common';
import {ProfileMessagesService} from '../../service/profile/profile-messages.service';
import {ProfileService} from '../../service/profile/profile.service';
import {ProfileModel} from '../../profile-model';

@Component({
    selector: 'app-profile-edit-photo',
    templateUrl: './profile-edit-photo.component.html',
    styleUrls: ['./profile-edit-photo.component.css'],
    providers: [NgbModalConfig, NgbModal],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileEditPhotoComponent implements OnInit, AfterViewInit, CanComponentDeactivate, OnDestroy {

    @ViewChild('content') content: TemplateRef<any>;

    photoProfileGroup: FormGroup;
    showConfirm: string;
    preview = false;
    disable = false;
    private photo: string;
    private result: string;
    private subscription: Subscription = new Subscription();

    constructor(config: NgbModalConfig,
                private modalService: NgbModal,
                private router: Router,
                private route: ActivatedRoute,
                // private platformLocation: PlatformLocation,
                private platformLocation: LocationStrategy,
                private profileService: ProfileService,
                private profileMessages: ProfileMessagesService
    ) {

        config.keyboard = true;
        //platformLocation.onPopState(() => this.modalService.dismissAll());
    }

    ngOnInit(): void {
        this.photoProfileGroup = new FormGroup({
            photoProfile: new FormControl('')
        });
    }

    ngAfterViewInit(): void {
        this.modalService.open(this.content);
    }

    onFileChange(e: any): void {
        const image = this.photoProfileGroup.get('photoProfile').value;
        const reader = new FileReader();
        let [height, width] = [0, 0];
        this.preview = false;
        if (e.target.files && e.target.files.length) {
            const [file] = e.target.files;

            if (this.isFileImage(file) === false) {
                console.log('upload specific type photo!');
            }

            reader.readAsDataURL(file);
            const img = new Image();
            let valid = true;
            reader.onload = (event) => {
                img.src = reader.result as string;
                img.onload = () => {
                    height = img.naturalHeight;
                    width = img.naturalWidth;

                    if (height > 500 || width > 500) {
                        valid = false;
                        console.log('invalid dimensions');
                        return false;
                    }
                    if (valid) {
                        this.preview = true;
                        this.result = reader.result as string;
                    }
                };

            };
        }
    }

    onSave(event): void {

        this.subscription = this.profileService.setPhoto(this.result)
            .subscribe(
                (value: ProfileModel) => {
                    this.profileMessages.setPhotoChanged(value.image);
                    setTimeout(() => {
                        this.onClose();
                    }, 500);
                },
                error => {
                },
                () => {
                    console.log('completed!');
                }
            );
    }

    onClose(): void {
        this.route.parent.params.subscribe((param: Params) => {
            const id = +param.id;
            this.router.navigate([`profile/${param.id}`]);
            this.modalService.dismissAll();
        });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        /*if (this.photoProfileGroup.get('photoProfile').value !== '') {
            this.confirmService.openModal();
            const subject = new Subject<boolean>();
            const modal = this.modalService.open(ConfirmComponent);
            return subject.asObservable();
        }*/
        return true;
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
        this.onClose();
    }

    isFileImage(file): boolean {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        return file && acceptedImageTypes.includes(file['type']);
    }

    /*@HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent): void {
        if (event.target === this.content.elementRef.nativeElement && this.modalService.hasOpenModals()) {
            this.platformLocation.onPopState(() => this.modalService.dismissAll());
            this.route.parent.params.subscribe((param: Params) => {
                const id = +param.id;
                this.router.navigate([`profile/${param.id}`]);
            });
        }
    }*/


}