import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';

/**
 * Creates a translation loader for internationalization (i18n) using the specified HTTP client.
 * @param http - The Angular HttpClient instance.
 * @returns A TranslateHttpLoader configured with the specified base path and file extension.
 */
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Represents a custom translation service for internationalization (i18n).
 * This service manages the language selection and provides an observable for language changes.
 * @public
 */
@Injectable({
    providedIn: 'root'
})
export class CustomTranslateService {
    private _language: BehaviorSubject<string> = new BehaviorSubject<string>('es');
    public language$ = this._language.asObservable();

    /**
     * Creates an instance of CustomTranslateService.
     * @param translate - The Angular TranslateService for managing translations.
     */
    constructor(
        private translate: TranslateService
    ) { }

    /**
     * Initializes the translation service by adding supported languages and setting the default language.
     * @private
     */
    private async init() {
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang(this._language.value);
    }

    /**
     * Sets the active language for translations.
     * @param language - The language code (e.g., 'es' for Spanish, 'en' for English).
     */
    use(language: string) {
        lastValueFrom(this.translate.use(language)).then(_ => {
            this._language.next(language);
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Retrieves the translated value for the specified key.
     * @param key - The translation key.
     * @returns An observable that emits the translated string.
     */
    get(key: string): Observable<string> {
        return this.translate.get(key);
    }

    /**
     * Retrieves the translated value for the specified item.
     * @param item - The translation key.
     * @returns The translated string.
     */
    getValue(item: string): string {
        var translation: string = "";
        this.get(item).subscribe(t => {
            translation = t;
        });
        return translation;
    }
}
