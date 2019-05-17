import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetPasswordRulesComponent } from './bottom-sheet-password-rules.component';

describe('BottomSheetPasswordRulesComponent', () => {
  let component: BottomSheetPasswordRulesComponent;
  let fixture: ComponentFixture<BottomSheetPasswordRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetPasswordRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetPasswordRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
