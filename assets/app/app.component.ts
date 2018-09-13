import { Component, OnInit } from '@angular/core';
import './@styles/styles.scss';
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor() { }

    // Defining global color pallet

    // Bases
        // #141D2F

    ngOnInit() {
        const colors = new Map([
            ['colorPrimary', '#141C2E'],
            ['colorPrimaryLight', '#28437A'],
            ['colorPrimaryLighter', '#41537A'],
            ['colorAlternativePrimary', '#6695FF'],
            ['colorAlternativePrimaryLight', '#93B4FF'],
            ['colorSecondaryLight', '#BC998D'],
            ['colorSecondary', '#7A5D1C'],
            ['colorSecondaryDark', '#2E2614'],
            ['colorRed', '#3B231F'],
            ['colorRedLight', '#D35058'],
            ['colorGreen', '#4C6120'],
            ['colorGreenLight', '#627A2F'],
            ['colorDark', '#1B1E1B'],
            ['colorDarkLight', '#313431'],
            ['colorWhite', '#FCFDFF'],
            ['colorHighlight', '#F3F9FF']
        ]);
        Array.from(colors.entries()).forEach(([name, value]) => {
            document.body.style.setProperty(`--${name}`, value);
        });

        FLAG_DICTIONARY.initialize();
    }

}
