import { Component, OnInit, QueryList, ViewChildren, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { DashboardService } from './dashboard.service';
import { IQuote, IQuoteData, IQuoteItem, IQuoteItems, IAccountInfo, IContactInfo } from './dashboard.model';
import { SignatureFieldComponent } from './../components/signature-field/signature-field.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService, ]
})
export class DashboardComponent implements OnInit {
  private quote: IQuote;
  private monthly: IQuoteItem;
  private oneTime: IQuoteItem;

  private quoteId: string;
  private accountId: string;
  private expireDate: string;
  private isLoading: boolean;
  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.quoteId = params['quote_id'];
      this.accountId = params['account_id'];
    });
    this.dashboardService.getQuote(this.quoteId, this.accountId)
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
  }

  public goProceed(): void {
    const dialogRef = this.dialog.open(ProceedDialogComponent, {
      height: '80%',
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      const signatureDlg = this.dialog.open(SignatureDialogComponent, {
        width: '800px',
        data: { quoteId: this.quoteId, accountId: this.accountId }
      });
    });
  }
}

@Component({
  selector: 'app-procced-dialog',
  templateUrl: 'app-procced-dialog.html',
})
export class ProceedDialogComponent {}

@Component({
  selector: 'app-signature-dialog',
  templateUrl: 'app-signature-dialog.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService, ],
})
export class SignatureDialogComponent {
  @ViewChildren(SignatureFieldComponent) public signatureField: QueryList<SignatureFieldComponent>;

  private form: FormGroup;
  private quoteId: string;
  private accountId: string;

  constructor(public fb: FormBuilder,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = fb.group({
      signatureField: ['', Validators.required],
    });
    this.quoteId = data.quoteId;
    this.accountId = data.accountId;
  }
  public downloadFile(data: Response) {
    window.open(data.url);
  }

  public onAccept() {
    const signatureEncoded = this.signatureField.first.signature;
    this.dashboardService.downloadPDF(this.quoteId, this.accountId, signatureEncoded)
      .subscribe(data => this.downloadFile(data),
      error => console.log('Error downloading the file.'),
      () => console.info('OK')
    );
  }
}
