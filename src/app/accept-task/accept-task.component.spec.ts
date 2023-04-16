import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTaskComponent } from './accept-task.component';

describe('AcceptTaskComponent', () => {
  let component: AcceptTaskComponent;
  let fixture: ComponentFixture<AcceptTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
