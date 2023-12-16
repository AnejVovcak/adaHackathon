import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CsvService} from "./csv-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adaHekaton';

  //in HTML i have SVG element with g element with ids like so: inkscape:label="Podčetrtek"

  @ViewChild('yourSvg') svgElement!: ElementRef;

  constructor(private renderer: Renderer2, private csvService: CsvService) {
  }

  ngAfterViewInit(): void {
    const csvFilePath = 'assets/index.csv';
    this.csvService.getCsvData(csvFilePath).subscribe(data => {
      const rows = this.parseCsvData(data);
      this.applyHeatmapColors(rows);
    });
    // Access and manipulate individual g elements here
    const gElements = this.svgElement.nativeElement.querySelectorAll('g');

    const targetLabel = 'Podčetrtek';
    const gElement = this.svgElement.nativeElement.querySelector(`g[inkscape\\:label="${targetLabel}"]`);

    if (gElement) {
      // Change the color of the found g element
      this.renderer.setStyle(gElement, 'fill', 'red');
    }
  }

  private calculateHeatmapColor(index: number): string {
    // Implement your logic to map index to a color (e.g., using a gradient scale)
    // For simplicity, let's use a basic example (green to red gradient)
    const r = Math.round(255 * (1 - index));
    const g = Math.round(255 * index);
    const b = 0;
    return `rgb(${r},${g},${b})`;
  }

  private applyHeatmapColors(rows: { targetLabel: string, index: number }[]): void {
    rows.forEach(row => {
      const targetLabel = row.targetLabel;
      const index = row.index;

      // Find the corresponding g element based on targetLabel
      const gElement = this.svgElement.nativeElement.querySelector(`g[inkscape\\:label="${targetLabel}"]`);

      if (gElement) {
        // Calculate the color based on the index value (customize this logic)
        const color = this.calculateHeatmapColor(index);

        // Apply the color to the g element
        this.renderer.setStyle(gElement, 'fill', color);
      }
    });
  }

  private parseCsvData(csvData: string): { targetLabel: string, index: number }[] {
    // Implement your CSV parsing logic here
    // Assuming CSV format is something like "targetLabel,index"
    const rows = csvData.split('\n').map(row => {
      const [targetLabel, indexStr] = row.split(',');
      return {targetLabel, index: parseFloat(indexStr)};
    });

    return rows;
  }

}
