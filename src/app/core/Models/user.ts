import { Image } from "./profile-image";

export interface User {
  id:string;
  fullName:string;
  gender:boolean;
  createdAt:Date;
  photoUrl:string;
  coverUrl:string;
  profilePhotos:Image[];
  coverPhotos:Image[];
}
