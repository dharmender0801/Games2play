import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-subscription-confirm-popup',
  templateUrl: './subscription-confirm-popup.component.html',
  styleUrls: ['./subscription-confirm-popup.component.css']
})
export class SubscriptionConfirmPopupComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  ConfirmSubscription(){
    $(".modal-header .close").click();
    this.router.navigate(['./Pricing/success'])
  }
}
