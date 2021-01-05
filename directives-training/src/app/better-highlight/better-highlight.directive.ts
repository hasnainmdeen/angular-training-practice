import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor: string = 'transparent';
  // @Input() highlightColor: string = 'aqua';
  // setting alias below for use like [directiveName]="'color'"
  @Input('appBetterHighlight') highlightColor: string = 'aqua';

  // A better way of doing the same thing we are doing in basic-highlight directive
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor; // initializing default color in onInit() bcs we the property
                                              // won't get overridden for the first time the pages load bcs the
                                              // mouse hadn't been hovered
  }

  @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostListener('mouseenter') mouseover(event: Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'aqua'); no issue in using this
    // this.backgroundColor = 'aqua'; // hard coded
    this.backgroundColor = this.highlightColor; // passing color by property binding of directive
  }

  @HostListener('mouseleave') mouseleave(event: Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent'); no issue in using this
    this.backgroundColor = this.defaultColor;
  }
}
