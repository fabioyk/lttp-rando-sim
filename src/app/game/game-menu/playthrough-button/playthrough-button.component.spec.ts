import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythroughButtonComponent } from './playthrough-button.component';

describe('PlaythroughButtonComponent', () => {
  let component: PlaythroughButtonComponent;
  let fixture: ComponentFixture<PlaythroughButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaythroughButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaythroughButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
