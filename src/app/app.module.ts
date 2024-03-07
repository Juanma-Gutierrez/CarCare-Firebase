import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './core/services/api/api.service';
import { AuthService } from './core/services/api/auth.service';
import { DataService } from './core/services/api/data.service';
import { FirebaseService } from './core/services/api/firebase/FirebaseService';
import { FirebaseAuthService } from './core/services/api/firebase/firebase-auth.service';
import { FirebaseDataService } from './core/services/api/firebase/firebase-data.service';
import { FirebaseMappingService } from './core/services/api/firebase/firebase-mapping.service';
import { MappingService } from './core/services/api/mapping.service';
import { createTranslateLoader } from './core/services/custom-translate.service';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { HttpClientProvider as HttpClientService } from './core/services/http/http-client.provider';
import { UtilsService } from './core/services/utils.service';
import { SharedModule } from './shared/shared.module';

/**
 * Factory function to provide `HttpClientWebProvider` based on the injected `HttpClient`.
 * @param http An instance of `HttpClient`.
 * @returns An instance of `HttpClientWebProvider`.
 */
export function httpProviderFactory(
    http: HttpClient) {
    return new HttpClientWebProvider(http);
}

/**
 * Factory function to create a `MappingService` instance based on the provided backend type.
 * @param backend The backend type (`'Firebase'` or others).
 * @returns An instance of `MappingService` or throws an error for unsupported backends.
 */
export function MappingServiceFactory(backend: string) {
    switch (backend) {
        case 'Firebase':
            return new FirebaseMappingService();
        default:
            throw new Error("Not implemented");
    }
}

/**
 * Factory function to create an `AuthService` instance based on the provided backend type.
 * @param backend The backend type (`'Firebase'` or others).
 * @param firebaseSvc An instance of `FirebaseService` (if `backend` is `'Firebase'`).
 * @param utilSvc An instance of `UtilsService`.
 * @returns An instance of `AuthService` or throws an error for unsupported backends.
 */
export function AuthServiceFactory(
    backend: string,
    firebaseSvc: FirebaseService,
    utilSvc: UtilsService
) {
    switch (backend) {
        case 'Firebase':
            return new FirebaseAuthService(utilSvc);
        default:
            throw new Error("Not implemented");
    }
}

/**
 * Factory function to create a `DataService` instance based on the provided backend type.
 * @param backend The backend type (`'Firebase'` or others).
 * @param api An instance of `ApiService`.
 * @returns An instance of `DataService` or throws an error for unsupported backends.
 */
export function DataServiceFactory(
    backend: string,
    api: ApiService) {
    switch (backend) {
        case 'Firebase':
            return new FirebaseDataService(api);
        default:
            throw new Error("Not implemented");
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        {
            provide: 'firebase-config',
            useValue: environment.firebaseConfig
        },
        {
            provide: 'backend',
            useValue: 'Firebase'
        },
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HttpClientService,
            deps: [HttpClient, Platform],
            useFactory: httpProviderFactory,
        },
        {
            provide: AuthService,
            deps: ['backend', ApiService, FirebaseService, UtilsService],
            useFactory: AuthServiceFactory,
        },
        {
            provide: DataService,
            deps: ['backend', ApiService],
            useFactory: DataServiceFactory,
        },
        {
            provide: MappingService,
            deps: ['backend'],
            useFactory: MappingServiceFactory
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
