import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CsvService} from "./csv-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adaHackathon';

  //in HTML i have SVG element with g element with ids like so: inkscape:label="Podčetrtek"

  @ViewChild('yourSvg') svgElement!: ElementRef;

  currentLabelOnHover: string | null = null;
  labelPosition: { top: number, left: number } | null = null;

  constructor(private renderer: Renderer2, private csvService: CsvService) {
  }

  ngAfterViewInit(): void {
    this.csvService.getCsvData().subscribe(data => {
      const rows = this.parseCsvData(data);
      this.applyHeatmapColors(rows);
    });
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

        // Add event listener for hover
        this.renderer.listen(gElement, 'mouseover', (event) => {
          this.currentLabelOnHover = targetLabel;
          this.calculateLabelPosition(event);
        });

        // Add event listener for mouseout (optional, to clear the label when not hovering)
        this.renderer.listen(gElement, 'mouseout', () => {
          this.currentLabelOnHover = null;
          this.labelPosition = null;
        });
      }
    });
  }

  private calculateLabelPosition(event: MouseEvent): void {
    // Use clientX and clientY to get the mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Apply the position to the label
    this.labelPosition = { top: mouseY, left: mouseX };
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
