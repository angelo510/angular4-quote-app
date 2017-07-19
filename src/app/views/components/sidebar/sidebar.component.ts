import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'manager', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
];

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  private menuItems: any[];

  public ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
