import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateursComponent } from './administrateurs.component';

describe('AdministrateursComponent', () => {
  let component: AdministrateursComponent;
  let fixture: ComponentFixture<AdministrateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
