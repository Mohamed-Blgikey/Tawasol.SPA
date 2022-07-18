export interface Image {
  id :number;
  url:string;
  publicId:string;
  dateAdded:Date;
  isMain:boolean;
  userId:string;
  width?:number;
  heigth?:number;
  postionX?:number;
  postionY?:number;
}
