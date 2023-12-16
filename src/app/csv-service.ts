import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Obcina} from "./obcina";

@Injectable({providedIn: 'root'})
export class CsvService {

  constructor(private http: HttpClient) {
  }

  csvFilePath = 'assets/index.csv';
  csvObcine = 'assets/sestObcin.csv';

  getCsvData(): Observable<any> {
    return this.http.get(this.csvFilePath, {responseType: 'text'});
  }

  getCsvObcine(): Observable<any> {
    return this.http.get(this.csvObcine, {responseType: 'text'});
  }

  parseCsvData(csvData: string): { targetLabel: string, index: number }[] {
    // Implement your CSV parsing logic here
    // Assuming CSV format is something like "targetLabel,index"
    const rows = csvData.split('\n').map(row => {
      const [targetLabel, indexStr] = row.split(',');
      return {targetLabel, index: parseFloat(indexStr)};
    });

    return rows;
  }

  parseCsvObcine(csvData: string): Obcina[] {
    // Implement your CSV parsing logic here
    // Assuming CSV format is something like "targetLabel,index"
    const rows = csvData.split('\n').map(row => {
      const [Municipality, Population, CulturalAssociations, SportsAssociations, Playgrounds, Kindergartens, AvailablePlaces] = row.split(',');
      return {
        Municipality,
        Population: parseInt(Population),
        CulturalAssociations: parseInt(CulturalAssociations),
        SportsAssociations: parseInt(SportsAssociations),
        Playgrounds: parseInt(Playgrounds),
        Kindergartens: parseInt(Kindergartens),
        AvailablePlaces: parseInt(AvailablePlaces)
      };
    });

    return rows;
  }
}
