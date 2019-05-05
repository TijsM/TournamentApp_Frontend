import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesPointComponent } from './acces-point.component';

describe('AccesPointComponent', () => {
  let component: AccesPointComponent;
  let fixture: ComponentFixture<AccesPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
