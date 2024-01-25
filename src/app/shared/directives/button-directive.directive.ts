import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[buttonDirective]'
})
export class ButtonDirective {
    private _color: string = "transparent";
    @Input() set ButtonDirective(color: string) {
        this._color = color;
    }
    get buttonDirective(): string {
        return this._color;
    }

    /**
     * Constructor de la directiva `ButtonDirective`.
     * @constructor
     * @param {Renderer2} renderer - Servicio Angular para manipular el DOM de manera segura.
     * @param {ElementRef} el - Referencia al elemento HTML al que se aplica la directiva.
     */
    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    /**
     * Manejador de eventos para el evento 'mouseenter' (paso del ratón sobre el elemento).
     * Activa la clase de estilo para resaltar el elemento.
     * @method onMouseEnter
     * @return {void}
     */
    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    /**
     * Manejador de eventos para el evento 'mouseleave' (retiro del ratón del elemento).
     * Desactiva la clase de estilo para restablecer el elemento a su apariencia original.
     * @method onMouseLeave
     * @return {void}
     */
    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    /**
     * Método privado para activar la clase de estilo y cambiar el fondo del elemento.
     * @method setActiveCard
     * @return {void}
     * @private
     */
    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'button-active');
    }

    /**
     * Método privado para desactivar la clase de estilo y restablecer el fondo del elemento.
     * @method unsetActiveCard
     * @return {void}
     * @private
     */
    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'button-active');
    }
}
