import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladiesComponent } from './maladies.component';

describe('MaladiesComponent', () => {
  let component: MaladiesComponent;
  let fixture: ComponentFixture<MaladiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaladiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaladiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
