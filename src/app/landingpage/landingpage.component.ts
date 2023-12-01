import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,private spinner: NgxSpinnerService) { 
    console.log("test");
  }

  ngOnInit() {
    console.log("in langingpage");
     localStorage.setItem('lang', 'en');
     //localStorage.setItem('startYourSubscription', this.route.snapshot.params['startYourSubscription']);
     localStorage.setItem('Usertrnsctionid', this.route.snapshot.params['Usertrnsctionid']);
     localStorage.setItem('Usermbid', this.route.snapshot.params['Usermbid']);
     localStorage.setItem('type', 'SUB');
     localStorage.setItem('requestID', this.route.snapshot.params['requestID']);
     localStorage.setItem('userId', this.route.snapshot.params['user-id']);
     //localStorage.setItem('user', this.route.snapshot.params['Usermbid']);
    // localStorage.setItem('subscribed', this.route.snapshot.params['subscribed']);
     localStorage.setItem('user-id', this.route.snapshot.params['user-id']);
     localStorage.setItem('user-jwt-token-key', this.route.snapshot.params['userjwttokenkey']);
     localStorage.setItem('productId',this.route.snapshot.params['productId']);
     localStorage.setItem('loginStatus',this.route.snapshot.params['loginStatus']);
     this.router.navigate(["./"]);
     //this.spinner.show();
     //window.location.reload();
    // localStorage.setItem('Usertrnsctionid','1579756199232'); //second otp se phele --> done
    // localStorage.setItem('upgrade-service-came-from','game'); // -->done
    // localStorage.setItem('loginStatus','true'); //15
    // localStorage.setItem('subscribed','true'); //eigth parameter -->done
    // localStorage.setItem('startYourSubscription','false'); // static parameter first -->done
    // localStorage.setItem('lang','en'); //0 --> done
    // localStorage.setItem('subscriptionStatus','5'); //11 paraemter --> done
    // localStorage.setItem('user','96512345605'); //seventh parameter --> done
    // localStorage.setItem('productId','1130'); //12  --> done
    // localStorage.setItem('Usermbid','96512345605'); //third parameter --> done
    // localStorage.setItem('user-id','35404'); // 9 parameter --> done
    // localStorage.setItem('userId','35404'); //sixth after otp enter --> Done
    // localStorage.setItem('type','pin_gen'); //fourth parameter --> not coming
    // localStorage.setItem('activationStatus','true'); // 13 -->done
    // localStorage.setItem('requestID','cc4f69b0c64a72af146682a79cedbb78'); // fifth parameter -->done
    // localStorage.setItem('getIsUserLoggedIn','true'); // 14
    // localStorage.setItem('user-jwt-token-key',
    // 'eyJ0eXBlIjoiSldUIiwia2lkIjoiMTU3OTc1NjE5OTIzMiIsImFsZyI6IlJTNTEyIn0.eyJpc3MiOiJFdGlzYWxhdF9XZWJfU3RvcmVfVmFsaWRhdGVfUGluX1Rva2VuIiwiZXhwIjoxNTgwNjIwMjExLCJqdGkiOiI3RThWRlBlYjNzRDV1N2p4Zm9ZZDh3IiwiaWF0IjoxNTc5NzU2MjExLCJuYmYiOjE1Nzk3NTYwOTEsInN1YiI6Ijk2NTEyMzQ1NjA1In0.gFZ8GqBOMwQjQ0extIqX9erRAES3yjyR9QVlfQzqS0QHaC8VTe3qw3xvUqVifXgeseylwlzz4SZodzr62BnhsXKlKyEK-FzPQWHh7Rgpz7bgV0VTooNu7gO_znpbhT5J5nqZzy0IxKdELrFFNeXcjptXU_PubT-Zq8l33Ldmj5i7EUS-S--05psOrVLZ92TxOL_F6Wzi3pHHIfseZ0UeF9GohnSCItB3HlWRI5ofAxobG6fDHd846CKBXM3Mv2KNEpxLeoCAMY23JXr2Aga12ZURYg_NAbNItoqk8UiQtrakQmlZxgnSxb3dGnFMdqIUtbVPcnvO06N3cOdLXecpHA'); // tenth parameter --> done
    //this.router.navigate([""]);
    
    //window.location.href="http://kw.games2play.co/#/";
    //window.location.href="http://localhost:4200/#/";
  }

}
