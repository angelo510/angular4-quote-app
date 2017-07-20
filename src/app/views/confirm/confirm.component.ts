import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'confirm-page',
  templateUrl: 'confirm.component.html'
})

export class ConfirmComponent implements OnInit {

  constructor() {
    console.log('redirecting...');
  }

  public ngOnInit() {
    setTimeout(() => {
        window.location.href = 'https://connected.com.au';
      },
      5000);
  }
}
