import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAccesComponent } from './history-acces.component';

describe('HistoryAccesComponent', () => {
  let component: HistoryAccesComponent;
  let fixture: ComponentFixture<HistoryAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
