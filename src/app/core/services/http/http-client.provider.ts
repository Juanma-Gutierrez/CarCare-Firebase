import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract class representing an HTTP client provider.
 * Implementations of this class should provide methods for making HTTP requests.
 * @public
 */
@Injectable({ providedIn: 'root' })
export abstract class HttpClientProvider {
    /**
     * Retrieves an image from the specified URL.
     * @param url - The URL of the image.
     * @returns An observable that emits the image data as a Blob.
     */
    public abstract getImage(
        url: string
    ): Observable<Blob>;

    /**
     * Performs an HTTP GET request.
     * @param url - The URL to send the GET request to.
     * @param params - Optional query parameters.
     * @param headers - Optional request headers.
     * @returns An observable that emits the response data of type T.
     */
    public abstract get<T>(url: string, params: any, headers: any): Observable<T>;

    /**
     * Performs an HTTP POST request.
     * @param url - The URL to send the POST request to.
     * @param body - The request body.
     * @param headers - Optional request headers.
     * @param urlEncoded - Whether the body should be URL-encoded (default: false).
     * @returns An observable that emits the response data of type T.
     */
    public abstract post<T>(url: string, body: any, headers: any, urlEncoded?: boolean): Observable<T>;

    /**
     * Performs an HTTP PUT request.
     * @param url - The URL to send the PUT request to.
     * @param body - The request body.
     * @param headers - Optional request headers.
     * @param urlEncoded - Whether the body should be URL-encoded (default: false).
     * @returns An observable that emits the response data of type T.
     */
    public abstract put<T>(url: string, body: any, headers: any, urlEncoded?: boolean): Observable<T>;

    /**
     * Performs an HTTP PATCH request.
     * @param url - The URL to send the PATCH request to.
     * @param body - The request body.
     * @param headers - Optional request headers.
     * @param urlEncoded - Whether the body should be URL-encoded (default: false).
     * @returns An observable that emits the response data of type T.
     */
    public abstract patch<T>(url: string, body: any, headers: any, urlEncoded?: boolean): Observable<T>;

    /**
     * Performs an HTTP DELETE request.
     * @param url - The URL to send the DELETE request to.
     * @param params - Optional query parameters.
     * @param headers - Optional request headers.
     * @returns An observable that emits the response data of type T.
     */
    public abstract delete<T>(url: string, params: any, headers: any): Observable<T>;

    /**
     * Sets the server trust mode for secure connections.
     * @param mode - The trust mode ('default', 'nocheck', 'pinned', or 'legacy').
     */
    public abstract setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void;
}
