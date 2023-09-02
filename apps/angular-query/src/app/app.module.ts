import { HttpClientModule } from '@angular/common/http';
import {
  ENVIRONMENT_INITIALIZER,
  inject,
  NgModule
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideQueryClientOptions,
  QueryClientService
} from '@ngneat/query';
import { SubscribeDirective } from '@ngneat/subscribe';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddUserComponent } from './pages/user/components/add-user/add-user.component';
import { UserListChildChildComponent } from './pages/user/components/user-list-child-child/user-list-child-child.component';
import { UserListChildComponent } from './pages/user/components/user-list-child/user-list-child.component';
import { UserListComponent } from './pages/user/components/user-list/user-list.component';
import { API_BASE_URL } from './pages/user/services/userService.service';
import { UserContainerComponent } from './pages/user/user-container.component';

@NgModule({
  declarations: [
    AppComponent,
    UserContainerComponent,
    UserListComponent,
    UserListChildComponent,
    UserListChildChildComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    SubscribeDirective,
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.api_base_url,
    },
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    }),
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
