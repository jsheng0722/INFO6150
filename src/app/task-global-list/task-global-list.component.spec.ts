import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGlobalListComponent } from './task-global-list.component';

describe('TaskGlobalListComponent', () => {
  let component: TaskGlobalListComponent;
  let fixture: ComponentFixture<TaskGlobalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGlobalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGlobalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
