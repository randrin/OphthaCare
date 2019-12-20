import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OphthacareComponent } from './ophthacare.component';

describe('OphthacareComponent', () => {
  let component: OphthacareComponent;
  let fixture: ComponentFixture<OphthacareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OphthacareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OphthacareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
