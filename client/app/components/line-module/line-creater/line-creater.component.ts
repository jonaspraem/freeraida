import { Component } from "@angular/core";
import { ILocation } from "../../../models/interfaces/types";
import { PolylineCoords } from "../../../legacy/lines/path.model";

@Component({
    selector: 'app-line-creator',
    templateUrl: './line-creator.component.html'
})

export class LineCreatorComponent {
    public line: ILocation[] = [];
    polyCords: PolylineCoords[];

    mapClicked($event:any) {
        const location: ILocation = {
            latitude: $event.coords.lat,
            longitude: $event.coords.lng
        };
        this.line.push(location);
        console.log(this.line);
        this.updatePolyCords();
    }

    updatePolyCords() {
        let cords: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let loc of this.line) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, loc.latitude, loc.longitude));
            prev_lat = loc.latitude;
            prev_lng = loc.longitude;
        }
        this.polyCords =  cords;
    }

    clickedMarker(loc: ILocation, index: number) {
        console.log('Clicked marker ', loc);
    }

    markerDragEnd(location: ILocation, index: number, $event: any) {
        this.line[index] = ({
            latitude: $event.coords.lat,
            longitude: $event.coords.lng
        });
        this.updatePolyCords();
    }
    // lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40]},
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}