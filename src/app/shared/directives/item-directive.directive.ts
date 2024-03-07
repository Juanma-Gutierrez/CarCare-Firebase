import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Custom directive to handle item behavior.
 * Usage:
 * <div [itemDirective]="color">Item content</div>
 * @param color The background color for the item.
 */
@Directive({
    selector: '[itemDirective]'
})
export class ItemDirective {
    private _color: string = "transparent";
    @Input() set ItemDirective(color: string) {
        this._color = color;
    }
    get itemDirective(): string {
        return this._color;
    }

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    /**
     * Event listener for mouse enter.
     * Sets the item as active.
     */
    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    /**
     * Event listener for mouse leave.
     * Unsets the item as active.
     */
    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    /**
     * Adds the 'item-active' class to the item element.
     */
    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'item-active');
    }

    /**
     * Removes the 'item-active' class from the item element.
     */
    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'item-active');
    }
}
