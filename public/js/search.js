/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/search.js":
/*!********************************!*\
  !*** ./resources/js/search.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  console.log('collegato');
  $('#btn-filter').on('click', function () {
    var beds = $('#beds').val();
    var rooms = $('#rooms').val();
    var bathrooms = $('#bathrooms').val();
    var amenitiesfilter = amenityFilter();
    $.ajax({
      url: "http://127.0.0.1:8000/api/placesInRange",
      method: "GET",
      data: {
        lat: $('#places-lat').val(),
        "long": $('#places-long').val()
      },
      success: function success(data) {
        var risultati = data;
        var amenitiesInPlace = [];

        for (var i = 0; i < risultati.length; i++) {
          var risultato = risultati[i];

          if (risultato.info.beds < beds) {
            $('#' + risultato.id).hide();
          }

          if (risultato.info.rooms < rooms) {
            $('#' + risultato.id).hide();
          }

          if (risultato.info.bathrooms < bathrooms) {
            $('#' + risultato.id).hide();
          }

          $('#' + risultato.id).find('.amenities').each(function () {
            var amenity = parseInt($(this).data('amenities'));
            amenitiesInPlace.push(amenity);
          });
          console.log('i servizi sono: ' + amenitiesInPlace);

          for (var x = 0; x < amenitiesfilter.length; x++) {
            console.log('ameniti filter corrisponde: ' + amenitiesfilter[x]);
            console.log('ameniti place corrisponde: ' + amenitiesInPlace);
            var check = amenitiesInPlace.includes(amenitiesfilter[x]);
            console.log(check);

            if (check === false) {
              $('#' + risultato.id).hide();
            }
          } // for (var x = 0; x < amenities.length; x++) {
          //     console.log('amenity filtro: ' + amenities[x]);
          //     console.log(risultato.amenities);
          //     console.log('amenity in appartamento: '+ amenitiesPlace);
          //     var amenitiesPlace = 0;
          //     var check = amenitiesPlace.includes(amenities[x]);
          //     console.log('Questo è check: '+ check);
          //     if (check == false) {
          //         $('#' + risultato.id).hide();
          //     }
          // }
          // var check = isTrue(risultato.amenities, amenities);

        }
      },
      error: function error() {
        alert("E' avvenuto un errore. ");
      }
    });

    function amenityFilter() {
      // Funzione che crea un array filters inserendo i valori delle checkbox che sono stati cliccati dall'utente
      var filters = [];
      $('.check-amenity').each(function () {
        if ($(this).prop('checked') == true) {
          filters.push(parseInt($(this).val()));
        }
      });
      return filters;
    }

    ;
  });
});

/***/ }),

/***/ 3:
/*!**************************************!*\
  !*** multi ./resources/js/search.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\MAMP\htdocs\progetto team6\boolbnb_t6\resources\js\search.js */"./resources/js/search.js");


/***/ })

/******/ });