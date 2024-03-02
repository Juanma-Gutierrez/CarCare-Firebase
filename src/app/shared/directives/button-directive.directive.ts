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
        this.renderer.addClass(this.el.nativeElement, 'button-active');
    }

    private unsetActiveCard() {
        this.renderer.removeClass(this.el.nativeElement, 'button-active');
    }
}
