import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('App', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({ declarations: [AppComponent] });
    });
    it('should work', function () {
        var fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});
//# sourceMappingURL=D:/Projects/freeraida/assets/app/app.component.spec.js.map