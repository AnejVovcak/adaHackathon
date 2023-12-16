import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class CsvService{

  constructor(private http: HttpClient) {}

  getCsvData(csvFilePath: string): Observable<any> {
    return this.http.get(csvFilePath, { responseType: 'text' });
  }
}
