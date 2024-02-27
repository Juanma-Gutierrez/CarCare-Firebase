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

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'activecard');
    }

    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'activecard');
    }
}
