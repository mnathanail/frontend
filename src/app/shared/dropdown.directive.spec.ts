import { DropdownDirective } from './dropdown.directive';
import {element} from 'protractor';
import {ElementRef} from '@angular/core';

describe('DropdownDirective', () => {
  it('should create an instance', () => {
    const directive = new DropdownDirective();
    expect(directive).toBeTruthy();
  });
});
