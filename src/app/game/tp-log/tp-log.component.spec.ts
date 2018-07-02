import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpLogComponent } from './tp-log.component';

describe('TpLogComponent', () => {
  let component: TpLogComponent;
  let fixture: ComponentFixture<TpLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
