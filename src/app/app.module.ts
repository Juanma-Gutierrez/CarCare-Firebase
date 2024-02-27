import { ApiService } from './core/services/api/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/services/api/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './core/services/api/data.service';
import { FirebaseAuthService } from './core/services/api/firebase/firebase-auth.service';
import { FirebaseDataService } from './core/services/api/firebase/firebase-data.service';
import { FirebaseMappingService } from './core/services/api/firebase/firebase-mapping.service';
import { FirebaseService } from './core/services/api/firebase/firebase.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider as HttpClientService } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { MappingService } from './core/services/api/mapping.service';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UtilsService } from './core/services/utils.service';
import { createTranslateLoader } from './core/services/custom-translate.service';
import { environment } from 'src/environments/environment';


export function httpProviderFactory(
    http: HttpClient) {
    return new HttpClientWebProvider(http);
}


export function MappingServiceFactory(backend: string) {
    switch (backend) {
        case 'Firebase':
            return new FirebaseMappingService();
        default:
            throw new Error("Not implemented");
    }
}


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
