import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from 'src/app/core/Models/profile-image';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {

  Images!:Image[];
  main!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:Image[]) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.Images = this.data;
    let x:any= this.Images.find(a=>a.isMain == true)?.url
    this.main = x;
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    margin:4,
    nav: true,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    smartSpeed:1000
  }

}
