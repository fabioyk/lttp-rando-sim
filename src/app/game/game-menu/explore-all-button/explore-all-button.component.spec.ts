import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreAllButtonComponent } from './explore-all-button.component';

describe('ExploreAllButtonComponent', () => {
  let component: ExploreAllButtonComponent;
  let fixture: ComponentFixture<ExploreAllButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreAllButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreAllButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
