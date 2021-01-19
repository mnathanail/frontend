import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TrueFalseService {

    private bool = new Subject<boolean>();

    public getBoolStatus(): Observable<boolean> {
        return this.bool.asObservable();
    }

    public setBoolStatus(value: boolean): void {
        this.bool.next(value);
    }

    public setBoolStatusError(error: any): void {
        this.bool.error(error);
    }

    public setBoolStatusComplete(): void {
        this.bool.complete();
    }


}
