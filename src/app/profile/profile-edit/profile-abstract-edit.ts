import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ProfileAbstractEdit {

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
        //event.target === this.content.elementRef.nativeElement && this.modalService.hasOpenModals()
        if (targetElement === event.target) {
            return;
        }
        if (targetElement && !document.body.contains(targetElement) && this.modalService.hasOpenModals()) {
            this.onClose();
        }
    }

    onClose(): void {
        this.modalService.dismissAll();
        this.route.parent.params.subscribe((param: Params) => {
            const id = +param.id;
            this.router.navigate([`profile/${param.id}`]);
        });
    }

    openModal(element: ElementRef): void {
        setTimeout(() => {
            this.modalService.open(element);
        }, 500);
    }
}
