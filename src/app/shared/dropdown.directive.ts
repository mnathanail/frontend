import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})
export class DropdownDirective {

    private _toggle = false;

    constructor(private element: ElementRef) {
    }

    @HostListener('click', ['$event']) toggleDropdown(event: Event): void {
        this._toggle = !this._toggle;

    }

    @HostListener('document:click', ['$event']) takis(event: Event): void{
        const targetElement = event.target as HTMLElement;
        if (targetElement && !this.element.nativeElement.contains(targetElement) && this._toggle === true){
            this._toggle = false;
        }
    }

    get toggle(): boolean {
        return this._toggle;
    }
}
