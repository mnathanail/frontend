import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})
export class DropdownDirective {

    private toggle = false;

    constructor(private element: ElementRef) {
    }

    get getToggle(): boolean {
        return this.toggle;
    }

    @HostListener('click', ['$event']) toggleDropdown(event: Event): void {
        this.toggle = !this.toggle;

    }

    @HostListener('document:click', ['$event']) takis(event: Event): void {
        const targetElement = event.target as HTMLElement;
        if (targetElement && !this.element.nativeElement.contains(targetElement) && this.toggle === true) {
            this.toggle = false;
        }
    }
}
