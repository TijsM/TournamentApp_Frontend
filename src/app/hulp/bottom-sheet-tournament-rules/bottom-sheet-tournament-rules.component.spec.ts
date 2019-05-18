import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetTournamentRulesComponent } from './bottom-sheet-tournament-rules.component';

describe('BottomSheetTournamentRulesComponent', () => {
  let component: BottomSheetTournamentRulesComponent;
  let fixture: ComponentFixture<BottomSheetTournamentRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetTournamentRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetTournamentRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
