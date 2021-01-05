import {
	AfterContentChecked,
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Component,
	ContentChild,
	DoCheck,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { ServerElement } from '../serverelement.model';

@Component({
	selector: 'app-server-element',
	templateUrl: './server-element.component.html',
	styleUrls: [ './server-element.component.css' ],
	encapsulation: ViewEncapsulation.Emulated // disabling the view encapsulation for server component
	// disabling view encapsulation would globally effect the css changes in this component
	// Emulated is the default behaviour. and Native is same as none but on browsers that support shadow DOM
})
export class ServerElementComponent
	implements OnInit,
		OnChanges,
		DoCheck,
		AfterContentInit,
		AfterContentChecked,
		AfterViewInit,
		AfterViewChecked,
		OnDestroy {
	// exposing server component property to other components using @Input() decorator.
	// If we want to use this property with some other name in outside world,
	// we can configure the @Input('srvElement') by passing a parameter as an alias
	// Here we are passing data from parent/root (app component) down to another component (server)
	// that was implemented there in parent. Passing something into the component and hence Input()
	@Input('srvElement') element: ServerElement = new ServerElement('', '', '');
	@Input() name: string; // we couldn't use element as object because object is of reference type and we pass
	// the object via input, therefore, both properties (object in server-element component
	// and objects in server elements array in app component) will point to the same place
	// in memory. If we change name there, it wil update in child component but it will not
	// trigger onChanges() method. Because technically the property we bind to Input() that
	// didn't change. It's still the same object in memory. That is why we are binding to
	// primitive that is string

	@ViewChild('heading', { static: true })
	heading: ElementRef;

	// here we can't use ViewChild. Because, it is in content (not in view of server component) and we are
	// we projected the content in this server component from app component
	@ContentChild('contentParagraph', { static: true })
	contentParagraph: ElementRef;

	constructor() {
		console.log('constructor called!');
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log('ngOnChanges called!');
		console.log(changes);
	}

	ngOnInit(): void {
		console.log('ngOnInit called!');
		console.log('Text content: ' + this.heading.nativeElement.textContent);
		console.log('Text content of Paragraph: ' + this.contentParagraph.nativeElement.textContent);
	}

	ngDoCheck() {
		console.log('ngDoCheck called!');
	}

	ngAfterContentInit() {
		console.log('ngAfterContentInit Called!');
		console.log('Text content of Paragraph: ' + this.contentParagraph.nativeElement.textContent);
	}

	ngAfterContentChecked() {
		console.log('ngAfterContentChecked Called!');
	}

	ngAfterViewInit() {
		console.log('ngAfterViewInit Called!');
		console.log('Text content: ' + this.heading.nativeElement.textContent);
	}

	ngAfterViewChecked() {
		console.log('ngAfterViewChecked Called!');
	}

	ngOnDestroy() {
		console.log('ngOnDestroy called!');
	}
}
