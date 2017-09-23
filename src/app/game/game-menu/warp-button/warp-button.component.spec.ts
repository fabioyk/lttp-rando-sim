import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarpButtonComponent } from './warp-button.component';

describe('WarpButtonComponent', () => {
  let component: WarpButtonComponent;
  let fixture: ComponentFixture<WarpButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarpButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
