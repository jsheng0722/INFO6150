import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGlobalTaskComponent } from './delete-global-task.component';

describe('DeleteGlobalTaskComponent', () => {
  let component: DeleteGlobalTaskComponent;
  let fixture: ComponentFixture<DeleteGlobalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGlobalTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGlobalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
