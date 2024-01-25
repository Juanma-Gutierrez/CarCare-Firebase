import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.page.html',
    styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage {

    /**
     * Constructor de la clase.
     * @param router Servicio de enrutamiento utilizado para navegar entre páginas.
     */
    constructor(
        private router: Router
    ) { }

    /**
     * Navega a la página de inicio.
     */
    navToHome() {
        this.router.navigate(["/home"]);
    }
}
