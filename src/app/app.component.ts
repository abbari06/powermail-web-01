import { Component } from '@angular/core';
import { SpinnerService } from './core/services/spinner-service/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'powermail-web';
  constructor(public spinnerService: SpinnerService){
  }
}
