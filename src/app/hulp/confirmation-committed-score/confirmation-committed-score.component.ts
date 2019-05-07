import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-committed-score',
  templateUrl: './confirmation-committed-score.component.html',
  styleUrls: ['./confirmation-committed-score.component.scss']
})
export class ConfirmationCommittedScoreComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {
    console.log('back to ranking button clicked');
    this._router.navigate(['/ranking']);
  }
}
