(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
        /***/ "./src/app/services/movie-search.service.ts": 
        /*!**************************************************!*\
          !*** ./src/app/services/movie-search.service.ts ***!
          \**************************************************/
        /*! exports provided: MovieSearchService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieSearchService", function () { return MovieSearchService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            var MovieSearchService = /** @class */ (function () {
                function MovieSearchService(httpClient) {
                    this.httpClient = httpClient;
                    this.serviceUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].omdbApiKUrl + '/?apikey=' + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].omdbApiKey;
                }
                MovieSearchService.prototype.findMovieByName = function (data) {
                    var reqUrl = this.serviceUrl + '&s=' + data.s + ((data.p) ? ('&page=' + data.p) : '');
                    console.log('reqUrl ->', reqUrl);
                    return this.httpClient.get(reqUrl);
                };
                MovieSearchService.prototype.getMovieById = function (id) {
                    console.log('id ->', id);
                    return this.httpClient.get(this.serviceUrl + '&i=' + id);
                };
                return MovieSearchService;
            }());
            MovieSearchService.ctorParameters = function () { return [
                { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
            ]; };
            MovieSearchService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
                tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
            ], MovieSearchService);
            /***/ 
        })
    }]);
//# sourceMappingURL=common-es2015.js.map
//# sourceMappingURL=common-es5.js.map
//# sourceMappingURL=common-es5.js.map