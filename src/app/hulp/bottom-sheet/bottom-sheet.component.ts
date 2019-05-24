import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  public errors: string[];
 errorsOutput: string = '';
  constructor() {
    this.errors = JSON.parse(localStorage.getItem('challengeErros'));

    this.errors.forEach(val => {
      this.errorsOutput = this.errorsOutput.concat(val + '\r\n');
      // this.errorsOutput = this.errorsOutput.concat('\n');
    });

  }

  ngOnInit() {}
}
