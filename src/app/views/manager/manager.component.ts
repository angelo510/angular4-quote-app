import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'manager-component',
    templateUrl: 'manager.component.html',
    styleUrls: ['manager.component.css'],
})

export class ManagerComponent implements OnInit {
    constructor(private router: Router) { }

    public ngOnInit() {
        console.log('app-works');
     }
}
