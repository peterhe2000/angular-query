import { HttpClientModule } from '@angular/common/http';
import {
  ENVIRONMENT_INITIALIZER,
  inject,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QueryClientService } from '@ngneat/query';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { API_BASE_URL } from './pages/user/services/userService.service';
import { UserContainerComponent } from './pages/user/user-container.component';
import { SubscribeDirective } from '@ngneat/subscribe';

@NgModule({
  declarations: [AppComponent, UserContainerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SubscribeDirective],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.api_base_url,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue() {
        const queryClient = inject(QueryClientService);
        import('@ngneat/query-devtools').then((m) => {
          m.ngQueryDevtools({ queryClient });
        });
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
