import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerNodeComponent } from './tracker-node.component';

describe('TrackerNodeComponent', () => {
  let component: TrackerNodeComponent;
  let fixture: ComponentFixture<TrackerNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
