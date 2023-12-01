import { Component, OnInit,Input,Pipe, PipeTransform } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SectionService } from '../Services/section.service';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-right-section',
  templateUrl: './right-section.component.html',
  styleUrls: ['./right-section.component.css'],
})
export class RightSectionComponent implements OnInit {
  pageUrl:string;
  @Input() pageGenreData:any;
  genreName:string;
  hasUserLoggedIn:boolean=false;
  userId:string;
  filterSelected: string;
  sortedData=[];

  filterText = '';
 
  constructor(
    private sectionService:SectionService,
    private _localStorage: LocalStorageService,
    private router: ActivatedRoute,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
    ) { 
      if (localStorage.getItem('lang')=="ar" ){
        translate.setDefaultLang('ar');
        this.filterText= "الأحدث";
      }
      else{
        translate.setDefaultLang('en');
        this.filterText= "NEWEST";
      }
    }

  ngOnInit() {
  // debugger
    this.pageUrl= "Games";
    this.SetupRouteChangeSubscriber();
    // below code to used to check the user is logged in or not
    this.checkUserLoggedInorNot();
    
  }
  setoninitFiltertext(){

    if (localStorage.getItem('lang')=="ar" ){
      this.translate.setDefaultLang('ar');
      this.filterText= "الأحدث";
    }
    else{
      this.translate.setDefaultLang('en');
      this.filterText= "NEWEST";
    }
  }

  SetFilterText() {
  
    if (this.filterSelected === 'newest') {
      if(localStorage.getItem('lang')=="ar")
      {
        this.filterText= "الأحدث";
      }
      else
      {
        this.filterText= "NEWEST";
      }
    } else if (this.filterSelected === 'AtoZ') {
      if(localStorage.getItem('lang')=="ar")
      {
        this.filterText= "أ - ي";
      }
      else
      {
        this.filterText = 'A - Z';
      }
     
    } else if (this.filterSelected === 'ZtoA') {
      if(localStorage.getItem('lang')=="ar")
      {
        this.filterText= "ي - أ";
      }
      else
      {
        this.filterText = 'Z - A';
      }
    } else if(this.filterSelected === 'recommended'){
      if(localStorage.getItem('lang')=="ar")
      {
        this.filterText = "موصى به";
      }
      else
      {
        this.filterText = "recommended";
      }
     
    }
  }

  checkUserLoggedInorNot(){
    this.userId= this._localStorage.GetUserId();
    if(this.userId==undefined || this.userId=="" || this.userId==null || this.userId=="undefined"){
     this.hasUserLoggedIn=false;
    }else if(this.userId !=null){
      this.hasUserLoggedIn=true;
    }
    else{
      this.hasUserLoggedIn=false;
    }
  }

  SetupRouteChangeSubscriber(): any {
   // debugger
    this._router.events.subscribe(val => {
      this.pageUrl= this.router.snapshot.queryParamMap.get('page');
      this.checkUserLoggedInorNot();
    });
  }
  sortA_Z(){
    this.filterSelected = 'AtoZ';
    this.SetFilterText();
    this.getRightSectionData('asc');
  }
  sortZ_A(){
    this.filterSelected = 'ZtoA';
    this.SetFilterText();
    this.getRightSectionData('desc');
  }
  getRightSectionData(order:string){
  
    this.genreName = localStorage.getItem('genreName');
    if(this.genreName=="undefined" || this.genreName=="" || this.genreName==null){
      this.genreName="All";
    }
    this.spinner.show();
    var pagename=this.pageUrl;
    var pageid=0
    if(pagename=="Videos")
    {
      pageid=9
    }
    else if(pagename=="Music")
    {
      pageid=10
    }
    else if(pagename=="Games")
    {
      pageid=11
    }
    else if(pagename=="Apps")
    {
      pageid=12
    }


    var language =localStorage.getItem('lang');
    let data = {
      'portalId': 73,
      //'pageName' : this.pageUrl,
      'pageId':pageid,
      'genre': this.genreName,
      'language':language
    }
    console.log(data);
    this.sectionService.GetPageDataByGenre(data).subscribe((response: any) => {
     
      if (response) {
      
      // this.pageGenreData= response.data;
      this.pageGenreData = [];
      console.log(response.staticData);
      response.staticData[0].forEach(childObj=> {
        (this.pageGenreData).push(childObj);
     })
     
       if(order=="asc"){
        this.pageGenreData= this.pageGenreData.sort((a,b)=>a.info.localeCompare(b.info));
     
       }else if(order=="desc"){
        this.pageGenreData=  this.pageGenreData.sort((a,b)=>b.info.localeCompare(a.info));
       }
      }
      this.spinner.hide();
    });
  }


 

  NewestClicked(){
    this.filterSelected = 'newest';
    this.SetFilterText();
    this.getRightSectionData('null');
  }
  RecommendedClicked(){
    this.filterSelected = 'recommended';
    this.SetFilterText();
  }
}


