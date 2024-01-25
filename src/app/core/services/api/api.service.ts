import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientProvider } from '../http/http-client.provider';
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt.service';
import { User } from '../../interfaces/User';
import { environment } from 'src/environments/environment';

/**
 * Servicio que proporciona métodos para realizar operaciones de API.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
    // Inserta aquí el usuario cargado para almacenarlo y mostrarlo en el user-item
    protected _user = new BehaviorSubject<User | null>(null);
    public user$ = this._user.asObservable();

    /**
     * Constructor del servicio ApiService.
     * @param http Proveedor de HttpClient utilizado para realizar peticiones HTTP.
     * @param jwt Servicio Jwt utilizado para gestionar tokens JWT.
     */
    constructor(
        private http: HttpClientProvider,
        private jwt: JwtService
    ) {
        this.http.get
    }

    /**
     * Actualiza el usuario almacenado en el servicio.
     * @param user Objeto que representa al usuario.
     */
    updateUser(user: User): void {
        this._user.next(user);
    }

    /**
     * Obtiene el usuario almacenado en el servicio.
     * @returns Objeto que representa al usuario o null si no hay usuario.
     */
    getUser(): User | null {
        return this._user.getValue();
    }

    /**
     * Obtiene las cabeceras HTTP necesarias para realizar una solicitud.
     * @param url URL de la solicitud.
     * @param accept Tipo de contenido aceptado.
     * @param contentType Tipo de contenido de la solicitud.
     * @returns Objeto que contiene las cabeceras HTTP.
     */
    getHeader(url: string, accept = null, contentType = null) {
        var header: any = {};
        if (accept)
            header['Accept'] = accept;
        if (contentType)
            header['Content-Type'] = contentType;
        if (!url.includes('auth'))
            header['Authorization'] = `Bearer ${this.jwt.getToken()}`;
        return header;
    }

    /**
     * Obtiene una imagen desde la URL proporcionada.
     * @param url URL de la imagen.
     * @returns Observable que emite la imagen obtenida.
     */
    getImage(url: string): Observable<any> {
        return this.http.getImage(url);
    }

    /**
     * Obtiene datos desde la URL proporcionada.
     * @param url URL de los datos.
     * @returns Observable que emite los datos obtenidos.
     */
    getDataFromUrl(url: string): Observable<any> {
        return this.http.get(url, {}, this.getHeader(url));
    }

    /**
     * Realiza una solicitud GET a la API.
     * @param path Ruta de la solicitud.
     * @param params Parámetros de la solicitud.
     * @returns Observable que emite la respuesta de la solicitud GET.
     */
    get(path: string, params: any = {}): Observable<any> {
        var url = `${environment.BASE_URL}${path}`;
        return this.http.get(url, params, this.getHeader(url));
    }

    /**
     * Realiza una solicitud PUT a la API.
     * @param path Ruta de la solicitud.
     * @param body Cuerpo de la solicitud.
     * @returns Observable que emite la respuesta de la solicitud PUT.
     */
    put(path: string, body: Object = {}): Observable<any> {
        var url = `${environment.BASE_URL}${path}`;
        return this.http.put(url, body, this.getHeader(url));
    }

    /**
     * Realiza una solicitud POST a la API.
     * @param path Ruta de la solicitud.
     * @param body Cuerpo de la solicitud.
     * @param content_type Tipo de contenido de la solicitud.
     * @returns Observable que emite la respuesta de la solicitud POST.
     */
    post(path: string, body: Object = {}, content_type = null): Observable<any> {
        var url = `${environment.BASE_URL}${path}`;
        return this.http.post(url, body, this.getHeader(url));
    }

    /**
     * Realiza una solicitud PATCH a la API.
     * @param path Ruta de la solicitud.
     * @param body Cuerpo de la solicitud.
     * @returns Observable que emite la respuesta de la solicitud PATCH.
     */
    patch(path: string, body: Object = {}): Observable<any> {
        var url = `${environment.BASE_URL}${path}`;
        return this.http.patch(url, body, this.getHeader(url));
    }

    /**
     * Realiza una solicitud DELETE a la API.
     * @param path Ruta de la solicitud.
     * @param params Parámetros de la solicitud.
     * @returns Observable que emite la respuesta de la solicitud DELETE.
     */
    delete(path: string, params: Object = {}): Observable<any> {
        var url = `${environment.BASE_URL}${path}`;
        return this.http.delete(url, params, this.getHeader(url));
    }
}
