import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCommittedScoreComponent } from './confirmation-committed-score.component';

describe('ConfirmationCommittedScoreComponent', () => {
  let component: ConfirmationCommittedScoreComponent;
  let fixture: ComponentFixture<ConfirmationCommittedScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCommittedScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCommittedScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
