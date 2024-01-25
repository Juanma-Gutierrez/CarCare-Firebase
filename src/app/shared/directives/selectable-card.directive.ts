import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSelectableCard]'
})
export class SelectedCardDirective {
    private _color: string = "transparent";
    @Input() set appSelectableCard(color: string) {
        this._color = color;
    }
    get appSelectableCard(): string {
        return this._color;
    }

    /**
     * Constructor de la directiva `SelectedCardDirective`.
     * @constructor
     * @param {Renderer2} renderer - Servicio Angular para manipular el DOM de manera segura.
     * @param {ElementRef} el - Referencia al elemento HTML al que se aplica la directiva.
     */
    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    /**
     * Manejador de eventos para el evento 'mouseenter' (paso del ratón sobre la tarjeta).
     * Activa la clase de estilo para resaltar la tarjeta.
     * @method onMouseEnter
     * @return {void}
     */
    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    /**
     * Manejador de eventos para el evento 'mouseleave' (retiro del ratón de la tarjeta).
     * Desactiva la clase de estilo para restablecer la tarjeta a su apariencia original.
     * @method onMouseLeave
     * @return {void}
     */
    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    /**
     * Método privado para activar la clase de estilo y cambiar el fondo de la tarjeta.
     * @method setActiveCard
     * @return {void}
     * @private
     */
    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'activecard');
    }

    /**
     * Método privado para desactivar la clase de estilo y restablecer el fondo de la tarjeta.
     * @method unsetActiveCard
     * @return {void}
     * @private
     */
    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'activecard');
    }
}
