import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchContainerComponent } from './search-container/search-container.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultLayoutHomeComponent } from './search-result-layout-home/search-result-layout-home.component';
import { SearchResultLayoutOtherComponent } from './search-result-layout-other/search-result-layout-other.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserIdleModule } from 'angular-user-idle';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { V2SearchBarComponent } from './v2-search-bar/v2-search-bar.component';
import { V2SearchContainerComponent } from './v2-search-container/v2-search-container.component';
import { V2SearchResultSingleComponent } from './v2-search-result-single/v2-search-result-single.component';
import { V2SearchResultAllComponent } from './v2-search-result-all/v2-search-result-all.component';
@NgModule({
  declarations: [SearchContainerComponent,
     SearchBarComponent,
      SearchResultComponent,
      SearchResultLayoutHomeComponent,
      SearchResultLayoutOtherComponent,
      V2SearchBarComponent,
      V2SearchContainerComponent,
      V2SearchResultSingleComponent,
      V2SearchResultAllComponent
      ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    HttpClientModule,
    //UserIdleModule.forRoot({idle: 1800, timeout: 10, ping: 10}),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  LazyLoadImageModule.forRoot({
    preset: intersectionObserverPreset
  })
  ]
})
export class SearchModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
