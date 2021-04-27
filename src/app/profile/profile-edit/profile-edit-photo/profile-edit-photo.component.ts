import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CanComponentDeactivate} from '../../../guard/can-deactivate';
import {Observable, Subscription} from 'rxjs';
import {LocationStrategy} from '@angular/common';
import {ProfileMessagesService} from '../../service/profile/profile-messages.service';
import {ProfileService} from '../../service/profile/profile.service';
import {ProfileModel} from '../../profile-model';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {takeUntil} from 'rxjs/operators';
import {TokenStorageService} from '../../../shared/service/token-storage.service';
import {ToastService} from '../../../toast/service/toast.service';

@Component({
    selector: 'app-profile-edit-photo',
    templateUrl: './profile-edit-photo.component.html',
    styleUrls: ['./profile-edit-photo.component.css'],
    providers: [NgbModalConfig, NgbModal],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileEditPhotoComponent extends ProfileAbstractEdit implements OnInit, AfterViewInit, CanComponentDeactivate, OnDestroy {

    @ViewChild('content') content: ElementRef;

    photoProfileGroup: FormGroup;
    showConfirm: string;
    preview = false;
    disable = false;
    private photo: string;
    private result: string;
    private subscription: Subscription = new Subscription();

    constructor(public config: NgbModalConfig,
                public modalService: NgbModal,
                public router: Router,
                public route: ActivatedRoute,
                // private platformLocation: PlatformLocation,
                private platformLocation: LocationStrategy,
                private profileService: ProfileService,
                private profileMessages: ProfileMessagesService,
                private toastService: ToastService
    ) {
        super(config, modalService, router, route);

        // platformLocation.onPopState(() => this.modalService.dismissAll());
    }

    ngOnInit(): void {
        this.photoProfileGroup = new FormGroup({
            photoProfile: new FormControl('')
        });
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
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
                this.toastService.show('Please try png or jpeg!', {
                    classname: 'bg-danger text-light',
                });
            }

            reader.readAsDataURL(file);
            const img = new Image();
            let valid = true;
            reader.onload = (event) => {
                img.src = reader.result as string;
                img.onload = () => {
                    height = img.naturalHeight;
                    width = img.naturalWidth;

                    if (height > 510 || width > 510) {
                        valid = false;
                        console.log('invalid dimensions');
                        this.toastService.show('Invalid dimensions. Try max 510x510!', {
                            classname: 'bg-danger text-light',
                        });
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
        const candidateId = this.getCandidateId();
        this.subscription = this.profileService.setPhoto(candidateId, this.result)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value: ProfileModel) => {
                    this.profileMessages.setPhotoChanged(value.image);
                    this.delayedModalClose();
                },
                error => {
                    this.profileMessages.setPhotoChangedError(error);
                },
                () => {
                    console.log('completed!');
                }
            );
    }

/*
    onClose(): void {
       this.onClose();
    }
*/

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
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    isFileImage(file): boolean {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        return file && acceptedImageTypes.includes(file.type);
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
