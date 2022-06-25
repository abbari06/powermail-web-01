import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CsvService {
  API_BASE_URL = '';
  constructor(private http: HttpClient) {
    this.API_BASE_URL = environment.API_BASE_URL;
  }
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  readCsvDetails(file) {
    console.log(file);
  }
  handlecsvdata($event: any) {
    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        var csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/); //returing this to for csv raw data
        this.records = csvRecordsArray;
        console.log(csvRecordsArray);
        // this.router.navigate(['csvmapping']);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      // this.fileReset();
    }
  }

  getcsvdata() {
    return this.records; //here
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
  //api call to to save the csv file
  saveCsv(prospects, userId, userAccountId): Observable<any> {
    console.log('dkndnkdndn');
    return this.http.post(this.API_BASE_URL + 'users/prospects/upload', {
      prospects,
      userId,
      userAccountId,
    });
  }
}
