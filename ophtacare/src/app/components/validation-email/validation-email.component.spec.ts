import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationEmailComponent } from './validation-email.component';

describe('ValidationEmailComponent', () => {
  let component: ValidationEmailComponent;
  let fixture: ComponentFixture<ValidationEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
