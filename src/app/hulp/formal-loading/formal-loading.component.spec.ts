import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalLoadingComponent } from './formal-loading.component';

describe('FormalLoadingComponent', () => {
  let component: FormalLoadingComponent;
  let fixture: ComponentFixture<FormalLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
