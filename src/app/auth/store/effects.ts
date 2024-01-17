import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../services/auth.services'
import {authActions} from './actions'
import {switchMap, map, catchError, of} from 'rxjs'
import {inject} from '@angular/core'
import {Action} from '@ngrx/store'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {HttpErrorResponse, HttpResponse} from '@angular/common/http'

/*export const registerEffect = createEffect(
    (action$ = inject(Action), authService = inject(AuthService)) => {
        return action$.pipe(
            ofType(authActions.register),
            switchMap(({request}) => {
                return authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return authActions.registerSuccess({currentUser})
                    }),
                )
            })
        )
    },
    {functional: true}
)
*/

export const registerEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request}) => {
          return authService.register(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              return authActions.registerSuccess({currentUser})
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                authActions.registerFailure({
                  errors: errorResponse.error.errors,
                })
              )
            })
          )
        })
      )
    },
    {functional: true}
  )
