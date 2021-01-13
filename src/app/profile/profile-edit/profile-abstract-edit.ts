import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Directive, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ProfileAbstractEdit implements OnDestroy {

    private readonly expId: string;
    private readonly eduId: string;
    protected destroy$ = new Subject();
    /*
        subs = new SubSink();
    * https://blog.angulartraining.com/how-to-automatically-unsubscribe-your-rxjs-observables-tutorial-2f98b0560298
    **/


    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute
    ) {
        // config.backdrop = 'static';
        config.keyboard = true;
        config.size = 'lg';
        config.centered = true;
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
        this.onClose();
    }

    @HostListener('document:click', ['$event', '$event.target'])
    onClickOutside(event: MouseEvent, targetElement: HTMLElement): void {
        // event.target === this.content.elementRef.nativeElement && this.modalService.hasOpenModals()
        if (targetElement === event.target) {
            return;
        }
        if (targetElement && !document.body.contains(targetElement) && this.modalService.hasOpenModals()) {
            this.onClose();
        }
    }

    onClose(): void {
        this.modalService.dismissAll();
        this.route.parent.params
            .pipe(takeUntil(this.destroy$))
            .subscribe((param: Params) => {
            const id = +param.id;
            this.router.navigate([`profile/${param.id}`]);
        });
    }

    openModal(element: ElementRef): void {
        setTimeout(() => {
            this.modalService.open(element);
        }, 500);
    }

    getExperienceId(): string {
        return this.route.parent.snapshot.params.expId;
    }

    getEducationId(): string {
        return this.route.parent.snapshot.params.eduId;
    }

    getCandidateId(): string {
        return this.route.parent.snapshot.params.id;
    }

    delayedModalClose(): void {
        setTimeout(() => {
            this.onClose();
        }, 500);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
