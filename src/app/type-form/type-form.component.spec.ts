import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFormComponent } from './type-form.component';

describe('TypeFromComponent', () => {
  let component: TypeFormComponent;
  let fixture: ComponentFixture<TypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
