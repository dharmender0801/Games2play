import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-section-view-all',
  templateUrl: './section-view-all.component.html',
  styleUrls: ['./section-view-all.component.css']
})
export class SectionViewAllComponent implements OnInit {

  @Input() sectionContent:any;
  @Input() pageId:string;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  viewAll(pageName:string,sectionId:any,pageId:any){
      this.router.navigate(['./Content'],{queryParams:{page:pageName,pageId:pageId,sectionId:sectionId}});
  }

}
