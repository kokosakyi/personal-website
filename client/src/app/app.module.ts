import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatMenuModule, MatRadioModule } from '@angular/material';
import 'hammerjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicationsComponent } from './publications/publications.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { LsdynaTutorialsComponent } from './lsdyna-tutorials/lsdyna-tutorials.component';
import { BlastParametersComponent } from './blast-parameters/blast-parameters.component';
import { ContactComponent } from './contact/contact.component';
import { RsaComponent } from './rsa/rsa.component';

import { ContactService } from './services/contact.service';
import { DownloadService } from './services/download.service';
import { BlastLoadService } from './services/blast-load.service';
import { DesignToolsComponent } from './design-tools/design-tools.component';
import { PfaProComponent } from './pfa-pro/pfa-pro.component';
import { FooterComponent } from './footer/footer.component';
import { ToggleResultsDirective } from './directives/toggle-results.directive';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'resume', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'publications', component: PublicationsComponent},
  {path: 'tutorials', component: TutorialsComponent},
  {path: 'tutorials/lsdyna', component: LsdynaTutorialsComponent},
  {path: 'tutorials/rsa', component: RsaComponent},
  {path: 'design-tools', component: DesignToolsComponent },
  {path: 'design-tools/pfa-pro', component: PfaProComponent},
  {path: 'design-tools/blast-parameters', component: BlastParametersComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutComponent,
    NavbarComponent,
    PublicationsComponent,
    TutorialsComponent,
    LsdynaTutorialsComponent,
    ContactComponent,
    RsaComponent,
    DesignToolsComponent,
    PfaProComponent,
    FooterComponent,
    BlastParametersComponent,
    ToggleResultsDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    YoutubePlayerModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatMenuModule, MatRadioModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ContactService, DownloadService, BlastLoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
