import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termsandcondition',
  templateUrl: './termsandcondition.component.html',
  styleUrls: ['./termsandcondition.component.css']
})
export class TermsandconditionComponent implements OnInit {

  constructor(private router: Router) { }

  language = "";
  terms_en = "";
  terms_ar = "";

  ngOnInit() {
    this.language = localStorage.getItem("lang");
    window.scrollTo(0,0);
  }

  close(){
    this.router.navigate(["/"]);
  }

}
