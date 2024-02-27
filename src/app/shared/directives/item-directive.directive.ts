import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

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


    @HostListener('mouseenter') onMouseEnter() {
        this.setActiveCard();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.unsetActiveCard();
    }

    private setActiveCard() {
        this.renderer.addClass(this.el.nativeElement, 'item-active');
    }

    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'item-active');
    }
}
