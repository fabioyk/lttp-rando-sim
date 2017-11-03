import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndStatsComponent } from './end-stats.component';

describe('EndStatsComponent', () => {
  let component: EndStatsComponent;
  let fixture: ComponentFixture<EndStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
