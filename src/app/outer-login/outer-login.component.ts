import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
@Component({
  selector: 'app-outer-login',
  templateUrl: './outer-login.component.html',
  styleUrls: ['./outer-login.component.css']
})
export class OuterLoginComponent implements OnInit {
 Username = "";
  Password= "";
  constructor(
    private router:Router,
    public toastr: ToastrManager,
  ) { 

    
  }

  ngOnInit() {
  }

  LoginClick()
  {
    if(this.Username!="" && this.Username!=null)
    {
        if(this.Password!="" && this.Password!=null)
        {
            if(this.Username=="Etisalate@gmail.com" && this.Password=="Password123#")
            {
                localStorage.setItem('username-key',this.Username);
                this.router.navigate(["/"])
            }
            else
            {
              this.toastr.errorToastr('Invalid credentials !', 'error!',{
                position: 'top-left'
              });
            }
        }
        else
        {
          this.toastr.errorToastr('Password is required !', 'error!',{
            position: 'top-left'
          });
        }
    }
    else
    {
      this.toastr.errorToastr('Username is required !', 'error!',{
        position: 'top-left'
      });
    }
  }

}
