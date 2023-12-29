import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error) => {
                if (error.status === 200) {
                    return of(new HttpResponse({
                        body: error.error,
                        status: 200,
                        statusText: 'OK',
                        headers: error.headers,
                        url: error.url || undefined,
                    }));
                }
                return throwError(error);
            })
        );
    }
}
