import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class CsvService{

  constructor(private http: HttpClient) {}

  csvFilePath = 'assets/index.csv';
  getCsvData(): Observable<any> {
    return this.http.get(this.csvFilePath, { responseType: 'text' });
  }
}
