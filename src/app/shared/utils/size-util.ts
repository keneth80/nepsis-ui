import {ElementRef} from "@angular/core";

export function contentSize(el: ElementRef, contentAttribute: String) :any {
  const element = el.nativeElement.querySelector(`[data-content=${contentAttribute}]`);
  return {
    height: element.offsetHeight,
    offsetHeight: element.offsetHeight,
    clientHeight: element.clientHeight,
    width: element.offsetWidth,
    offsetWidth: element.offsetWidth,
    clientWidth: element.clientWidth,
  };
}
