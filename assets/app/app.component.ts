import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor() { }

    // Defining global color pallet

    ngOnInit() {
        const colors = new Map([
            ['colorPrimary', '#023059'],
            ['colorPrimaryLight', '#166BBC'],
            ['colorPrimaryLighter', '#56A1BF'],
            ['colorSecondaryLight', '#D9C589'],
            ['colorSecondary', '#A68521'],
            ['colorSecondaryDark', '#594302'],
            ['colorClay', '#A68160'],
            ['colorRed', '#8C4F65'],
            ['colorGreen', '#798C65'],
            ['colorGreenLight', '#BDBFAA'],
            ['colorDark', '#1B1E1B'],
        ]);
        Array.from(colors.entries()).forEach(([name, value]) => {
            document.body.style.setProperty(`--${name}`, value);
        });
    }

}
