import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor() { }
  showNotification(from, align) {
      const type = ['', 'info', 'success', 'warning', 'danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: 'notifications',
          message: '<b>Web Quote App</b>'

      }, {
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }
  ngOnInit() {
  }

}
