export interface ProfileModel {
    id: number;
    name: string;
    surname: string;
    email: string;
    profilePic: any;
    image: string;
    authorities: Authority[];
}

interface Authority{
    authority: string;
}
