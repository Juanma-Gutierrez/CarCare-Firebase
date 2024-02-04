import { ApiService } from './core/services/api/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/services/api/auth.service';
import { AuthStrapiService } from './core/services/api/strapi/auth-strapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './core/services/api/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider as HttpClientService } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { JwtService } from './core/services/jwt.service';
import { MappingService } from './core/services/api/mapping.service';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { StrapiDataService } from './core/services/api/strapi/strapi-data.service';
import { StrapiMappingService } from './core/services/api/strapi/strapi-mapping.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './core/services/custom-translate.service';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './core/services/api/firebase/firebase.service';
import { FirebaseAuthService } from './core/services/api/firebase/firebase-auth.service';
import { FirebaseDataService } from './core/services/api/firebase/firebase-data.service';
import { FirebaseMappingService } from './core/services/api/firebase/firebase-mapping.service';

/**
 * Proveedor de fábrica para el servicio de HTTP.
 * @param {HttpClient} http - Cliente HTTP de Angular.
 * @returns {HttpClientWebProvider} - Instancia del proveedor de servicios HTTP.
 */
export function httpProviderFactory(
    http: HttpClient) {
    return new HttpClientWebProvider(http);
}

/**
 * Proveedor de fábrica para el servicio de mapeo.
 * @param {string} backend - Backend seleccionado.
 * @returns {StrapiMappingService} - Instancia del servicio de mapeo de Strapi.
 */
export function MappingServiceFactory(
    backend: string) {
    switch (backend) {
        case 'Firebase':
            return new FirebaseMappingService();
        default:
            throw new Error("Not implemented");
    }
}

/**
 * Proveedor de fábrica para el servicio de autenticación.
 * @param {JwtService} jwt - Servicio de tokens JWT.
 * @param {ApiService} api - Servicio de API.
 * @returns {AuthStrapiService} - Instancia del servicio de autenticación de Strapi.
 */
export function AuthServiceFactory(
    backend: string,
    jwt: JwtService,
    api: ApiService,
    firebase: FirebaseService
) {
    switch (backend) {
        case 'Strapi':
            return new AuthStrapiService(jwt, api);
        case 'Firebase':
            return new FirebaseAuthService(firebase);
        default:
            throw new Error("Not implemented");
    }
}

/**
 * Proveedor de fábrica para el servicio de datos.
 * @param {string} backend - Backend seleccionado.
 * @param {ApiService} api - Servicio de API.
 * @returns {StrapiDataService} - Instancia del servicio de datos de Strapi.
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
            deps: ['backend',JwtService, ApiService,FirebaseService],
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
