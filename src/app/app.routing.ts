import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TemplateSettingComponent } from './template-setting/template-setting.component';
import { TableListComponent } from './table-list/table-list.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
    { path: 'quote',                          component: DashboardComponent },
    { path: 'quote/:account_id/:quote_id',    component: DashboardComponent },
    { path: 'confirm',                        component: ConfirmComponent },
    { path: 'user-profile',                   component: UserProfileComponent },
    { path: 'template-setting',               component: TemplateSettingComponent },
    { path: 'table-list',                     component: TableListComponent },
    { path: 'notifications',                  component: NotificationsComponent },
    { path: '',                               redirectTo: 'notifications', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
