import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGlobalPageComponent } from './task-global-page.component';

describe('TaskGlobalPageComponent', () => {
  let component: TaskGlobalPageComponent;
  let fixture: ComponentFixture<TaskGlobalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGlobalPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGlobalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
