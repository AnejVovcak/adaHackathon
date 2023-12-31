import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CsvService} from "../csv-service";
import {Obcina} from "../obcina";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
//in HTML i have SVG element with g element with ids like so: inkscape:label="Podčetrtek"

  @ViewChild('yourSvg') svgElement!: ElementRef;

  currentLabelOnHover: string | null = null;
  labelPosition: { top: number, left: number } | null = null;
  clicked = false;

  constructor(private renderer: Renderer2, private csvService: CsvService) {
  }

  ngAfterViewInit(): void {
    //set radio input to surplus
    this.csvService.getCsvData().subscribe(data => {
      const rows = this.csvService.parseCsvData(data);
      this.applyHeatmapColors(rows);
    });
  }

  selectIncome() {
    this.csvService.getCsvData().subscribe(data => {
      const rows = this.csvService.parseIncome(data);
      this.applyHeatmapColors(rows);
    });
  }

  selectSurplus() {
    this.csvService.getCsvData().subscribe(data => {
      const rows = this.csvService.parseSurplus(data);
      this.applyHeatmapColors(rows);
    });
  }

  selectRatio() {
    this.csvService.getCsvData().subscribe(data => {
      const rows = this.csvService.parseRatio(data);
      this.applyHeatmapColors(rows);
    });
  }

  selectCrime() {
    this.csvService.getCsvData().subscribe(data => {
      const rows = this.csvService.parseCrime(data);
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

        // Add event listener for click
        this.renderer.listen(gElement, 'click', (event) => {
          this.handleGElementClick(targetLabel);
          //set border to clicked element
          this.renderer.setStyle(gElement, 'stroke', 'black');
          this.renderer.setStyle(gElement, 'stroke-width', '5');
        });
      }
    });
  }

  onCloseDetails() {
    //remove border from clicked element
    const gElement = this.svgElement.nativeElement.querySelector(`g[inkscape\\:label="${this.selectedObcina?.Municipality}"]`);
    if (gElement) {
      this.renderer.setStyle(gElement, 'stroke', 'black');
      this.renderer.setStyle(gElement, 'stroke-width', '1');
    }
    this.clicked = false;
    this.selectedObcina = undefined;
  }

  private calculateLabelPosition(event: MouseEvent): void {
    // Use clientX and clientY to get the mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Apply the position to the label
    this.labelPosition = {top: mouseY, left: mouseX};
  }

  selectedObcina: Obcina | undefined;
  private handleGElementClick(targetLabel: string): void {
    // Handle the click event for the g element with the specified targetLabel
    this.csvService.getCsvObcine().subscribe(data => {
      this.clicked = true;
      this.selectedObcina = this.csvService.parseCsvObcine(data).find(obcina => obcina.Municipality === targetLabel)
      if (this.selectedObcina == undefined) {
        return;
      }
      let score = this.selectedObcina?.Score;
      this.selectedObcina.Score = 0;
      //increment score to see the animation
      let interval = setInterval(() => {
        this.selectedObcina!.Score += 1;
        //set color of div with class score to color of heatmap
        console.log(this.selectedObcina!.Score/100)
        console.log(this.calculateHeatmapColor(this.selectedObcina!.Score))
        document.getElementById("score")!.style.color = this.calculateHeatmapColor(this.selectedObcina!.Score/100)

        if (this.selectedObcina!.Score >= score) {
          clearInterval(interval);
        }
      }, 30);

      console.log(this.csvService.parseCsvObcine(data))
    })
    console.log(`Clicked on ${targetLabel}`);
  }

}
