/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './js/feed.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nfunction fetchPodcastFeed() {\n    const feedUrl = \"https://feeds.castos.com/8ro36?uuid=631ba96a65a2f\";\n    const feed = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './js/feed.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ url: feedUrl });\n    feed.load((err, items) => {\n      if (err) {\n        console.error(\"Error fetching RSS feed:\", err);\n      } else {\n        populateEpisodeList(items);\n      }\n    });\n  }\n  function populateEpisodeList(episodes) {\n    const episodeList = document.getElementById(\"episode-list\");\n    for (const episode of episodes) {\n      const episodeItem = document.createElement(\"li\");\n      const titleElement = document.createElement(\"h3\");\n      titleElement.textContent = episode.title;\n      episodeItem.appendChild(titleElement);\n  \n      const descriptionElement = document.createElement(\"p\");\n      descriptionElement.textContent = episode.description;\n      episodeItem.appendChild(descriptionElement);\n  \n      // Create Plyr player container with attributes\n      const playerContainer = document.createElement(\"div\");\n      playerContainer.setAttribute(\"data-plyr-provider\", \"podcast\");\n      playerContainer.setAttribute(\"data-plyr-embed-id\", \"episode-\" + episode.id);\n      episodeItem.appendChild(playerContainer);\n  \n      episodeList.appendChild(episodeItem);\n    }\n  }\n  fetchPodcastFeed();\nPlyr.setup().then(() => {\n  // Additional Plyr configuration after setup\n});\n\n//# sourceURL=webpack://postfun/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/script.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;