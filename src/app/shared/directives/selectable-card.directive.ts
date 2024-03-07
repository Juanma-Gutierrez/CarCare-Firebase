import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Custom directive to handle selectable card behavior.
 * Usage:
 * <div [appSelectableCard]="color">Selectable card content</div>
 * @param color The background color for the selectable card.
 */
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

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    /**
     * Event listener for mouse enter.
     * Sets the selectable card as active.
     */
    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    /**
     * Event listener for mouse leave.
     * Unsets the selectable card as active.
     */
    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    /**
     * Adds the 'activecard' class to the selectable card element.
     */
    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'activecard');
    }

    /**
     * Removes the 'activecard' class from the selectable card element.
     */
    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'activecard');
    }
}
