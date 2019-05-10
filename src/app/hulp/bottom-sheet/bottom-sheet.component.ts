import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  private errors: string[];
  private errorsOutput: string = '';
  constructor() {
    this.errors = JSON.parse(localStorage.getItem('challengeErros'));

    this.errors.forEach(val => {
      console.log('in foreach');
      console.log('--' + val);
      this.errorsOutput = this.errorsOutput.concat(val + '\r\n');
      // this.errorsOutput = this.errorsOutput.concat('\n');
    });

    console.log('in sheet comp');
    console.log(this.errors);
    console.log(this.errorsOutput);
  }

  ngOnInit() {}
}
