import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientProvider } from './http-client.provider';

/**
 * Implementation of the HttpClientProvider using the Angular HttpClient for web requests.
 */
@Injectable({ providedIn: 'root' })
export class HttpClientWebProvider extends HttpClientProvider {

    /**
     * Constructs an instance of the HttpClientWebProvider.
     * @param {HttpClient} httpClient - The Angular HttpClient instance.
     */
    constructor(
        private readonly httpClient: HttpClient
    ) {
        super();
    }

    /**
     * Retrieves an image from the specified URL.
     * @param {string} url - The URL of the image.
     * @returns {Observable<Blob>} An observable containing the image data as a Blob.
     */
    public getImage(
        url: string
    ): Observable<Blob> {
        return this.httpClient.get(url, {
            responseType: "blob"
        });
    }

    /**
     * Performs an HTTP GET request to the specified URL.
     * @param {string} url - The URL to send the GET request to.
     * @param {any} params - Optional query parameters to include in the request.
     * @param {any} headers - Optional headers to include in the request.
     * @returns {Observable<T>} An observable containing the response data.
     */
    public get<T>(
        url: string,
        params: any = {},
        headers: any = {}
    ): Observable<T> {
        return this.httpClient.get<T>(url, {
            params: new HttpParams({ fromObject: params }),
            headers: this.createHeaders(headers)
        });
    }

    /**
     * Performs an HTTP POST request to the specified URL.
     * @param {string} url - The URL to send the POST request to.
     * @param {any} body - The request body data.
     * @param {any} headers - Optional headers to include in the request.
     * @param {boolean} urlEncoded - Whether the body data should be URL-encoded.
     * @returns {Observable<T>} An observable containing the response data.
     */
    public post<T>(
        url: string,
        body: any = {},
        headers: any = {},
        urlEncoded: boolean = false
    ): Observable<T> {
        return this.httpClient.post<T>(url, this.createBody(body, urlEncoded), {
            headers: this.createHeaders(headers, urlEncoded)
        });
    }

    /**
     * Performs an HTTP PUT request to the specified URL.
     * @param {string} url - The URL to send the PUT request to.
     * @param {any} body - The request body data.
     * @param {any} headers - Optional headers to include in the request.
     * @param {boolean} urlEncoded - Whether the body data should be URL-encoded.
     * @returns {Observable<T>} An observable containing the response data.
     */
    public put<T>(
        url: string,
        body: any = {},
        headers: any = {},
        urlEncoded: boolean = false
    ): Observable<T> {
        return this.httpClient.put<T>(url, this.createBody(body, urlEncoded), {
            headers: this.createHeaders(headers, urlEncoded)
        });
    }

    /**
     * Performs an HTTP PATCH request to the specified URL.
     * @param {string} url - The URL to send the PATCH request to.
     * @param {any} body - The request body data.
     * @param {any} headers - Optional headers to include in the request.
     * @param {boolean} urlEncoded - Whether the body data should be URL-encoded.
     * @returns {Observable<T>} An observable containing the response data.
     */
    public patch<T>(
        url: string,
        body: any = {},
        headers: any = {},
        urlEncoded: boolean = false
    ): Observable<T> {
        if (body instanceof FormData) {
            return this.httpClient.patch<T>(url, body, { headers: headers });
        }
        else {
            return this.httpClient.patch<T>(url, this.createBody(body, urlEncoded), {
                headers: this.createHeaders(headers, urlEncoded)
            });
        }
    }

    /**
     * Performs an HTTP DELETE request to the specified URL.
     * @param {string} url - The URL to send the DELETE request to.
     * @param {any} params - Optional query parameters to include in the request.
     * @param {any} headers - Optional headers to include in the request.
     * @returns {Observable<T>} An observable containing the response data.
     */
    public delete<T>(
        url: string,
        params: any = {},
        headers: any = {}
    ): Observable<T> {
        return this.httpClient.delete<T>(url, {
            params: new HttpParams({ fromObject: params }),
            headers: this.createHeaders(headers)
        });
    }

    /**
     * Sets the server trust mode for HTTP requests.
     * @param {'default' | 'nocheck' | 'pinned' | 'legacy'} mode - The desired server trust mode.
     * @returns {void}
     */
    public setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void { }

    /**
     * Creates HttpHeaders based on the provided headers and URL-encoded flag.
     * @param {any} headers - Optional headers to include in the request.
     * @param {boolean} urlEncoded - Whether the body data should be URL-encoded.
     * @returns {HttpHeaders} The created HttpHeaders.
     */
    private createHeaders(
        headers: any,
        urlEncoded: boolean = false
    ): HttpHeaders {
        var _headers = new HttpHeaders(headers);
        if (urlEncoded)
            _headers.set('Accept', ' application/x-www-form-urlencoded');
        return _headers;
    }

    /**
     * Creates the request body based on the provided data and URL-encoded flag.
     * @param {any} body - The request body data.
     * @param {boolean} urlEncoded - Whether the body data should be URL-encoded.
     * @returns {any | HttpParams} The created request body.
     */
    private createBody(body: any, urlEncoded: boolean): any | HttpParams {
        return urlEncoded
            ? new HttpParams({ fromObject: body })
            : body;
    }
}
