import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {

  email:string ='';
  token:string ='';

  constructor(private active:ActivatedRoute ,private auth:AuthService,private alert:HotToastService,private route:Router) { }

  ngOnInit(): void {
    this.email = this.active.snapshot.queryParams['email'];
    this.token = this.active.snapshot.queryParams['token'];
    // console.log(this.email);
    // console.log(this.token);

  }


  Confirme(){
    this.alert.loading("Confirming in ....",{duration:10000000000,id:"closeLoading"})
    let obj = {
      email : this.email,
      token : this.token
    }
    // console.log(obj);

    if (obj.email == undefined|| obj.token == undefined) {
      this.alert.close("closeLoading");
      this.alert.info("Check inbox")


    }else{
      this.auth.ConfirmeEmail(obj).subscribe(res=>{
        if (res.message == "pls create acount first") {
          this.alert.close("closeLoading");
          this.alert.warning(res.message);
          this.route.navigate(["/signup"])
        }else{
          this.alert.close("closeLoading");
          this.alert.success(res.message);
          this.route.navigate(["/login"])
        }
      })
    }
  }

}
