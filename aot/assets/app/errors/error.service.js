import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.errorOccured = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        var errorData = new Error(error.title, error.error.message);
        this.errorOccured.emit(errorData);
    };
    return ErrorService;
}());
export { ErrorService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/errors/error.service.js.map