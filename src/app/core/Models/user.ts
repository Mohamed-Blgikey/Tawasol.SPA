import { Image } from "./profile-image";

export interface User {
  id:string;
  fullName:string;
  gender:boolean;
  createdAt:Date;
  photoUrl:string;
  coverUrl:string;
  city:string;
  country:string;
  instagram:string;
  whatsApp:string;
  socialSituationnstagram:string;
  work:string;
  graduated:string;
  profilePhotos:Image[];
  coverPhotos:Image[];
}
