import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                // Se não logarmos o usuário estará nulo:
                if(!user) {
                    return next.handle(req);
                }
                // Demais requests já logados:
                const modReq = req.clone(
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
                return next.handle(modReq);
            })
        );
    }
}