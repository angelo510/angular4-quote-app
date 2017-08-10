import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  private countDown = 5;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      window.location.href = 'https://connected.com.au';
    }, 5000);
  }

}
