import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

/**
 * Crea un cargador para la traducción que utiliza el servicio TranslateHttpLoader.
 * @param http Cliente HTTP utilizado para realizar peticiones.
 * @return Instancia de TranslateHttpLoader configurada con la ruta y extensión de los archivos de traducción.
 */
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
    providedIn: 'root'
})
export class CustomTranslateService {
    private _language: BehaviorSubject<string> = new BehaviorSubject<string>('es');
    public language$ = this._language.asObservable();

    constructor(
        private translate: TranslateService
    ) { }


    private async init() {
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang(this._language.value);
    }

    /**
     * Establece el idioma para las traducciones.
     * @param language Código del idioma a utilizar.
     */
    use(language: string) {
        lastValueFrom(this.translate.use(language)).then(_ => {
            this._language.next(language);
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Obtiene la traducción asociada a la clave proporcionada.
     * @param key Clave de la traducción.
     * @return Observable que emite la traducción como string.
     */
    get(key: string): Observable<string> {
        return this.translate.get(key);
    }

    getValue(item: string): string {
        var translation: string = "";
        this.get(item).subscribe(t => {
            console.log(t)
            translation = t;
        });
        return translation;
    }
}
