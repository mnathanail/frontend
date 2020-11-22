import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProfileModel} from '../../profile-model';

@Injectable({providedIn: 'root'})
export class ProfileMessagesService {
    private readonly  DEFAULT_PHOTO_PROFILE = 'assets/images/generic.jpg';

    private photoChanged = new BehaviorSubject<{value: string}>({value: this.DEFAULT_PHOTO_PROFILE});

    public getPhotoChanged(): Observable<{value: string}> {
        return this.photoChanged.asObservable();
    }

    public setPhotoChanged(value: string): void {
        this.photoChanged.next({value});
    }

    public setPhotoChangedError(error: any): void {
        this.photoChanged.error(error);
    }

    public setPhotoChangedComplete(): void {
        this.photoChanged.complete();
    }

}
