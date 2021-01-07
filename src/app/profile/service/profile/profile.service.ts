import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {ProfileModel} from '../../profile-model';

@Injectable({providedIn: 'root'})
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    fetchProfile(candidateId: string): Observable<ProfileModel> {
        const url = Endpoints.PROFILE_GET;
        const params = new HttpParams()
            .set('candidateId', candidateId);

        /*const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');*/

        return this.http.get<ProfileModel>(url, {params});
    }

    setPhoto(candidateId: string, photoBlob: string): Observable<{ profilePic: string }> {
        const url = Endpoints.PROFILE_PHOTO_POST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.post<ProfileModel>(url, {profilePic: photoBlob}, {params});
    }

}
