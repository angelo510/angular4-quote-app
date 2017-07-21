import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  NgbModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

import {
  Subject
} from 'rxjs/Subject';
import {
  debounceTime
} from 'rxjs/operator/debounceTime';

import {
  HomeService
} from './home.service';

import {
  SignatureFieldComponent
} from './signature-field/signature-field.component';
import {
  IMyDpOptions
} from 'mydatepicker';

import {
  IQuote,
  IQuoteData,
  IQuoteItem,
  IQuoteItems,
  IAccountInfo,
  IContactInfo
} from '../../models/quote';

import { INoteData } from '../../models/notes';

@Component({
  selector: 'home',
  providers: [
    HomeService,
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  @ViewChildren('signatureField') public signatureField: SignatureFieldComponent;

  private quote: IQuote;
  private notes: INoteData;
  private monthly: IQuoteItem;
  private oneTime: IQuoteItem;

  private quoteId: string;
  private accountId: string;
  private expireDate: string;

  private _success = new Subject < string > ();

  private staticAlertClosed = false;
  private successMessage: string;
  private form: FormGroup;
  private modalRef: NgbModalRef;

  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    width: '78%',
    height: '40px',
    editableDateField: false,
    openSelectorOnInputClick: true,
  };
  private dataPicker: any = {
    date: {
      year: 2018,
      month: 10,
      day: 9
    }
  };

  private isLoading: boolean;
  private isCollapsed = false;

  constructor(
    private homeServce: HomeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = fb.group({
      signatureField: ['', Validators.required],
    });
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
          this.expireDate = this.quote.data.quote.expiration_date.toString();
          this.monthly = this.quote.data.quote_items.monthly;
          this.oneTime = this.quote.data.quote_items.one_time;
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.router.navigateByUrl('/confirm');
          }
        }
      );
    this.homeServce.getNotes(this.quoteId, this.accountId)
      .subscribe((notes) => { this.notes = notes; });

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
  }

  private OnProceed(content, flag: boolean = true) {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.modalRef = this.modalService.open(content, {
      size: 'lg'
    });
  }

  private OnAccept() {
    this.homeServce.wonQuote(this.quoteId, this.accountId)
      .subscribe((result) => {
        this._success.next('The Quote has been won!');
        this.modalRef.close();
      });
  }

  private onClear() {
    console.log(this.signatureField._signature);
    this.signatureField.clear();
  }

}
