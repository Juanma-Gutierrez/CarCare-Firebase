import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Custom directive to handle button behavior.
 * Usage:
 * <button [buttonDirective]="color">Click me</button>
 * @param color The background color for the button.
 */
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

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    /**
     * Event listener for mouse enter.
     * Sets the button as active.
     */
    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    /**
     * Event listener for mouse leave.
     * Unsets the button as active.
     */
    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    /**
     * Adds the 'button-active' class to the button element.
     */
    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'button-active');
    }

    /**
     * Removes the 'button-active' class from the button element.
     */
    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'button-active');
    }
}
