import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QueryClientService } from '@ngneat/query';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { API_BASE_URL } from './pages/user/services/userService.service';
import { UserContainerComponent } from './pages/user/user-container.component';
import { SubscribeDirective } from '@ngneat/subscribe';
import { UserListComponent } from './pages/user/components/user-list/user-list.component';
import { UserListChildComponent } from './pages/user/components/user-list-child/user-list-child.component';
import { UserListChildChildComponent } from './pages/user/components/user-list-child-child/user-list-child-child.component';

@NgModule({
  declarations: [
    AppComponent,
    UserContainerComponent,
    UserListComponent,
    UserListChildComponent,
    UserListChildChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SubscribeDirective,
  ],
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
