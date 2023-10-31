import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirm2Component } from './confirm2.component';

describe('Confirm2Component', () => {
  let component: Confirm2Component;
  let fixture: ComponentFixture<Confirm2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Confirm2Component]
    });
    fixture = TestBed.createComponent(Confirm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
