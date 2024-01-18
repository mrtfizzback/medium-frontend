import {bootstrapApplication} from '@angular/platform-browser'
import {provideRouter} from '@angular/router'
import {AppComponent} from './app/app.component'
import {appRoutes} from './app/app.routes'
import {provideState, provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {isDevMode} from '@angular/core'
import {authFeatureKey, authReducer} from './app/auth/store/reducers'
import {provideEffects} from '@ngrx/effects'
import * as authEffects from './app/auth/store/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import { authInterceptor } from './app/shared/services/authinterceptor'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
})
