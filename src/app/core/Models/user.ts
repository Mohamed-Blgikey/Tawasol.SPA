import { ProfileImage } from "./profile-image";

export interface User {
  fullName:string;
  gender:boolean;
  createdAt:Date;
  photoUrl:string;
  profilePhotos:ProfileImage[]
}
