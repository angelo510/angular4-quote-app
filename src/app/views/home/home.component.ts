import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

import {
  IQuote,
  IQuoteData,
  IQuoteItem,
  IQuoteItems,
  IAccountInfo,
  IContactInfo
} from '../../models/quote';

@Component({
  selector: 'home',
  providers: [
    HomeService,
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  private quote: IQuote;
  private monthlyItems: IQuoteItem[];
  private oneTimeItems: IQuoteItem[];
  private isLoading: boolean;

  private quoteId: string;
  private accountId: string;

  private _success = new Subject<string>();

  private staticAlertClosed = false;
  private successMessage: string;

  private modalRef: NgbModalRef;

  constructor(
    private homeServce: HomeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.isLoading = true;
  }

  public ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.quoteId = params['quote_id'];
      this.accountId = params['account_id'];
    });
    this.homeServce.getQuote(this.quoteId, this.accountId)
      .subscribe((q) => {
        this.quote = q;
        this.monthlyItems = this.quote.data.quote_items.monthly_items;
        this.oneTimeItems = this.quote.data.quote_items.one_time_items;
        this.isLoading = false;
      });

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);

  }

  private OnProceed(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  private OnAccept() {
    this.homeServce.wonQuote(this.quoteId, this.accountId)
    .subscribe((result) => {
      this._success.next('The Quote has been won!');
      this.modalRef.close();
    });
  }

}
