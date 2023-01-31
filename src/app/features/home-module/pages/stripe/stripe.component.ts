import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, Inject, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionService } from 'src/app/core/services/stripe/subscription.service';
// declare var module: NodeModule;
// declare var stripe: any;
// declare var elements: any;
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  dateToday: any =new Date(new Date().setDate(new Date().getDate() + 7));

  planType: string;
  card: any;
  stripePaymentToken: any;
  email:any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder, private subscriptionService: SubscriptionService , @Inject(MAT_DIALOG_DATA) public emailData: any
  ,private dilaogRef: MatDialogRef<StripeComponent>) { }
  subscriptionForm = this.fb.group({
    address_city: [],
    address_state: [],
    address_country: []
  })
  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }
  ngAfterViewInit() {
    this.email = this.emailData
     console.log(this.emailData);

    // this.dateToday.setDate(this.dateToday + 7);
    console.log(this.dateToday);
    this.initiateCardElement();
  }
  initiateCardElement() {
    console.log(elements)
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        border: '2px solid',
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          border: '2px solid',
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card',{cardStyle});
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change',this.cardHandler);
  }
  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  async createStripeToken() {

    const { token, error } = await stripe.createToken(this.card, this.subscriptionForm.value);
    if (token) {
      this.stripePaymentToken = token.id;
      this.startSubscription();
      console.log('success');
    } else {
      console.log('error');

      this.onError(error);
    }
  }
  onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
  ngOnInit(): void { }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  subscriptionPlan(priceId) {
    this.planType = priceId;
    this.step++;
  }

  startSubscription() {
    console.log("strttttttt");
    
    this.subscriptionService.startSubscription( this.email, this.stripePaymentToken, "price_1LD9T1SJwDo9kb3I2TtN6N2y").subscribe({
      next: (res: any) => {
        this.dilaogRef.close('success');
      },
      error: (error: any) => {
       console.log(error);
       
      }
    })
  }

}
