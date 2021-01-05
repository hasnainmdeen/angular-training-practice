import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ServerElement } from "../serverelement.model";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  // passing the event out of the component (to parent component)
  @Output() serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
  @Output() blueprintCreated = new EventEmitter<{blueprintName:string, blueprintContent:string}>();

  // newServerName = '';
  // newServerContent = '';

  //using view child to get reference from template
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName: HTMLInputElement) {
    // console.log(serverName); from refernce in template, it brings complete html element to TypeScript
    // console.log(this.serverContentInput)
    this.serverCreated.emit({
      serverName: serverName.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serverName: HTMLInputElement) {

    this.blueprintCreated.emit({
      blueprintName: serverName.value,
      blueprintContent: this.serverContentInput.nativeElement.value
    })
  }

}
