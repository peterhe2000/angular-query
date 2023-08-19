import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { API_BASE_URL } from './pages/user/services/userService.service';
import { UserContainerComponent } from './pages/user/user-container.component';

@NgModule({
  declarations: [AppComponent, UserContainerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.api_base_url,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
