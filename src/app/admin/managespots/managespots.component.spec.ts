import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagespotsComponent } from './managespots.component';

describe('ManagespotsComponent', () => {
  let component: ManagespotsComponent;
  let fixture: ComponentFixture<ManagespotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagespotsComponent]
    });
    fixture = TestBed.createComponent(ManagespotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
