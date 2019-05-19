import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsMedecinsComponent } from './professionsMedecins.component';

describe('ProfessionsMedecinsComponent', () => {
  let component: ProfessionsMedecinsComponent;
  let fixture: ComponentFixture<ProfessionsMedecinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionsMedecinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionsMedecinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
