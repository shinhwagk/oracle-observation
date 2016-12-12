import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input('myHighlight') id: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.hiddenAll()
    document.getElementById(this.id).style.visibility = "visible";
  }

  @HostListener('mouseleave') onMouseLeave() {
    // document.getElementById(this.id).style.visibility = "hidden";
  }

  hiddenAll() {
    this.sers.forEach(id => document.getElementById(id).style.visibility = "hidden")
  }

  sers = ['test', 'dev', 'lt', 'yali']

}