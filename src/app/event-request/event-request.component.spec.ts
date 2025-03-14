import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRequestComponent } from './event-request.component';

describe('EventRequestComponent', () => {
  let component: EventRequestComponent;
  let fixture: ComponentFixture<EventRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
