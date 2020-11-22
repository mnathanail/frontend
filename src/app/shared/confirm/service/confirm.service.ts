import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {

    private modal = new Subject<string>();

    getModal(): Observable<string> {
        return this.modal.asObservable();
    }

    openModal(): void {
        this.modal.next('open');
    }

    closeModal(): void {
        this.modal.next('close');
    }
}
