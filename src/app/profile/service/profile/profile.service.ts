import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {ProfileModel} from '../../profile-model';

@Injectable({providedIn: 'root'})
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    fetchProfile(): Observable<ProfileModel> {
        const url = Endpoints.PROFILE_GET.replace(':id', '1');
        return this.http.get<ProfileModel>(url);
    }

    setPhoto(photoBlob: string): Observable<{ profilePic: string }> {
        const url = Endpoints.PROFILE_PHOTO_POST.replace(':id', '1');
        return this.http.post<ProfileModel>(url, {profilePic: photoBlob});
    }


}
