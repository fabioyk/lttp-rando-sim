import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTrackerComponent } from './item-tracker.component';

describe('ItemTrackerComponent', () => {
  let component: ItemTrackerComponent;
  let fixture: ComponentFixture<ItemTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
