import { Content } from '@angular/compiler/src/render3/r3_ast';

export class ServerElement {
  public type:string;
  public name:string;
  public content:string;

  constructor (type: string, name:string, content:string) {
    this.type = type;
    this.name = name;
    this.content = content;
  }
}
