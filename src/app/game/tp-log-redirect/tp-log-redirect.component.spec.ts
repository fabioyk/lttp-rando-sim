import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpLogRedirectComponent } from './tp-log-redirect.component';

describe('TpLogRedirectComponent', () => {
  let component: TpLogRedirectComponent;
  let fixture: ComponentFixture<TpLogRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpLogRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLogRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
