import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonItemsComponent } from './dungeon-items.component';

describe('DungeonItemsComponent', () => {
  let component: DungeonItemsComponent;
  let fixture: ComponentFixture<DungeonItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DungeonItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
