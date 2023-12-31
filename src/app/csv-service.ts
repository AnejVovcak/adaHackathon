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
    return csvData.split('\n').map(row => {
      const [targetLabel, surplus, income, ratio,crime, indexStr] = row.split(',');
      return {targetLabel, index: parseFloat(indexStr)};
    });
  }

  parseIncome(csvData: string): { targetLabel: string, index: number }[] {
    return csvData.split('\n').map(row => {
      const [targetLabel, surplus, income, ratio,crime, indexStr] = row.split(',');
      console.log(targetLabel, surplus, income, ratio, indexStr);
      return {targetLabel, index: parseFloat(income)};
    });
  }

  parseSurplus(csvData: string): { targetLabel: string, index: number }[] {
    return csvData.split('\n').map(row => {
      const [targetLabel, surplus, income, ratio,crime, indexStr] = row.split(',');
      return {targetLabel, index: parseFloat(surplus)};
    });
  }

  parseRatio(csvData: string): { targetLabel: string, index: number }[] {
    return csvData.split('\n').map(row => {
      const [targetLabel, surplus, income, ratio,crime, indexStr] = row.split(',');
      return {targetLabel, index: parseFloat(ratio)};
    });
  }

  parseCrime(csvData: string): { targetLabel: string, index: number }[] {
    return csvData.split('\n').map(row => {
      const [targetLabel, surplus, income, ratio,crime, indexStr] = row.split(',');
      return {targetLabel, index: parseFloat(crime)};
    });
  }

  parseCsvObcine(csvData: string): Obcina[] {
    // Implement your CSV parsing logic here
    // Assuming CSV format is something like "targetLabel,index"
    const rows = csvData.split('\n').map(row => {
      const [Municipality, Population, CulturalAssociations, SportsAssociations, Playgrounds, Kindergartens, AvailablePlaces, Score] = row.split(',');
      return {
        Municipality,
        Population: parseInt(Population),
        CulturalAssociations: parseInt(CulturalAssociations),
        SportsAssociations: parseInt(SportsAssociations),
        Playgrounds: parseInt(Playgrounds),
        Kindergartens: parseInt(Kindergartens),
        AvailablePlaces: parseInt(AvailablePlaces),
        Score: parseInt(Score)
      };
    });

    return rows;
  }
}
