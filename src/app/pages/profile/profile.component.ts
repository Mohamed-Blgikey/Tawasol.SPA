import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  User:any;

  constructor(private active:ActivatedRoute) { }

//   @HostListener('window:scroll', ['$event']) onScrollEvent($event:any) {
//     console.log(window.pageYOffset);
//     console.log(window.outerHeight);
//     console.log(window.innerHeight);
//     console.log(this.divCurtain.nativeElement.offsetHeight);
//     ;
// }

  ngOnInit(): void {
    this.active.data.subscribe(res=>{
      // console.log(res['user']);
      this.User = res['user']
    })
  }


}
