import { Image } from "./profile-image";

export interface User {
  fullName:string;
  gender:boolean;
  createdAt:Date;
  photoUrl:string;
  coverUrl:string;
  profilePhotos:Image[];
  coverPhotos:Image[];
}
