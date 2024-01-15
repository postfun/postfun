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

/***/ "./js/feed.js":
/*!********************!*\
  !*** ./js/feed.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n$(function() { // Document ready function\n  let url = $('#happening-feed').attr('url'); // This is the URL for your JSON feed.\n\n  //Pagination and modal\n  let state = {\n    'page': 1,\n    'elements': 7,\n    'count': 0,\n    'pageNum': 0,\n    'window': 5,\n    'feedSize': 0,\n    'elementPerRow': 1,\n    'currentEvent': 1,\n  }\n\n  //Configuration\n  let config = {\n    'pop-up': false,\n    'wide': false,\n    'search': false,\n  }\n\n  //Params\n  let params = {\n    'elementWidth': 300,\n    'wide': \"\",\n  }\n\n  //Events data\n  let events;\n  let filteredEvents;\n  let showEvents;\n\n  //Event placeholder\n  let placeholder = {\n    'image_url': \"https://events.umich.edu/images/default-events-module.png\",\n    'permalink': \"https://events.umich.edu/\",\n    'event_title': \"See whats Happening @ Michigan\",\n    'date_start': \"\",\n    'location_name': \"\",\n    'links': \"\",\n  }\n\n  //advance search\n  let tagSet = new Set();\n  let typeSet = new Set();\n\n  //Display the loader before getting the json data\n  let loaderHtml = '<div class = \"loader-container feed-container center\"><div class=\"loader\"></div></div>';\n  $('#happening-feed').append(loaderHtml);\n  \n  //advance search animation\n  let animateTime = 500;\n  // Run an ajax call. The documentation is here : http://api.jquery.com/jquery.ajax/\n  $.ajax({\n    url: url, // Set the URL for the json feed\n    success: function(data) { // Run this if there is a successful call\n      let classList;\n      let classListArray;\n      let searchHtml;\n      let eventFeedHtml;\n      let linkToHappening;\n      let linkToHappeningHtml;\n      let paginationHtml;\n      $('#happening-feed').empty();\n      classList = $('#happening-feed').attr(\"class\");\n      classListArray = classList.split(/\\s+/);\n      classListArray.forEach(element => {\n        if(element == \"pop-up\") config[\"pop-up\"] = true;\n        else if(element == \"wide\"){\n          config[\"wide\"] = true;\n          params['wide'] = \"-wide\";\n          params[\"elementWidth\"] = 480;\n        }\n        else if(element == \"search\"){\n          config['search'] = true;\n        }\n      });\n      if(config['search']){\n        searchHtml = '<div class = \"feed-search feed-container center\"><div id = \"search-content\" class = \"search-content\"><h3>Search Events</h3>'\n        searchHtml += '<input id= \"search-input\" class = \"search-input\" type=\"text\" placeholder=\"Search..\"></input><div class = \"advance-search-toggle-container\"><a id = \"advance-search-toggle\">advance search</a><div>';\n        $('#happening-feed').append(searchHtml);\n        $(\"#search-input\").on(\"keyup\", function() {\n          search();\n        });\n        $('#advance-search-toggle').on(\"click\", function() {\n          if($('#advance-search').height() === 0){\n            autoHeightAnimate($('#advance-search'), animateTime);\n          } \n          else {\n            $('#advance-search').stop().animate({ height: '0'}, animateTime);\n          }\n        });\n      }\n      eventFeedHtml = '<div id = \"event-feed\"></div>';\n      $('#happening-feed').append(eventFeedHtml);\n      linkToHappening = url.replace(\"/json\", \"\");\n      linkToHappeningHtml = '<div class = \"feed-container center link-to-happening\"><a href = \"'+ linkToHappening+ '\">View the full page on Happening @ Michigan</a></div>'\n      $('#happening-feed').append(linkToHappeningHtml);\n      paginationHtml = '<div class = \"feed-container center\"><div id=\"pagination-wrapper\"></div></div>';\n      $('#happening-feed').append(paginationHtml);\n      if(config['pop-up']){\n        let modalHtml = '<div id=\"feed-modal\" class=\"feed-modal\"><div class=\"feed-modal-content\"><div id = \"feed-modal-header\" class=\"feed-modal-header\"><span id = \"feed-modal-close\" class=\"feed-modal-close\">&times;</span></div><div id = \"feed-modal-body\" class=\"feed-modal-body feed-modal-row\"></div></div></div>';\n        $('#happening-feed').append(modalHtml);\n        // When the user clicks on <span> (x), close the modal\n        $('#feed-modal-close').on('click', function(){\n          $('#feed-modal').hide();\n        });\n      }\n      events = data;\n      filteredEvents = events;\n      showEvents = filteredEvents;\n      state.feedSize = $('#event-feed').width();\n      state.elementPerRow = Math.floor(state.feedSize/params[\"elementWidth\"])>=1 ? Math.floor(state.feedSize/params[\"elementWidth\"]): 1;\n      pagination();\n      if(config['search']) advanceSearchSetup();\n      }\n  });\n\n  $(window).resize(function() {\n    state.feedSize = $('#happening-feed').width();\n    if(state.elementPerRow != Math.floor(state.feedSize/params[\"elementWidth\"])){\n      state.elementPerRow = Math.floor(state.feedSize/params[\"elementWidth\"])>=1 ? Math.floor(state.feedSize/params[\"elementWidth\"]): 1;\n      pagination();\n    }\n    buildModal(showEvents[state['currentEvent']]);\n  });\n\n  $(window).click(function(event){\n    if(event.target == $('#feed-modal')[0]){\n      $('#feed-modal').hide();\n    }\n  });\n\n  function pagination(){\n    let trimStart;\n    let trimEnd;\n    let row;\n    let html = '';\n    state.count = Object.keys(showEvents).length;\n    state.pageNum = (Math.ceil(state.count/state.elements) == 0) ? 1:Math.ceil(state.count/state.elements);\n    $('#event-feed').empty();\n    trimStart = (state.page - 1) * state.elements;\n    trimEnd = (trimStart + state.elements < state.count) ? trimStart + state.elements: state.count;\n    for(let i = trimStart; i <= trimEnd; i++) { // loop though list of objects\n      if((i-trimStart)%state.elementPerRow==0){\n        row = '<div class=\"event-row feed-container\">';\n        $('#event-feed').append(row);\n      }\n      if(i == trimEnd){\n        html = buildEvent(placeholder,-1);\n      }\n      else{\n        html = buildEvent(showEvents[i],i); // build html for object\n      }\n      $('.event-row').last().append(html); // append each object to the <div id=\"happening-feed\"></div>\n    }\n\n    if(state.count == 0){\n      html = \"<h3>No events found. Please modify your search and try again</h3>\";\n      $('.event-row').last().append(html);\n    }\n      \n    if(config['pop-up']){\n      $(\".event-modal-button\").click(function() {\n        $('#feed-modal').show();\n        state['currentEvent'] = $(this).val();\n        buildModal(showEvents[state['currentEvent']]);\n      });\n      $(\".event-title\").click(function() {\n        state['currentEvent'] = $(this).val();\n        if(state['currentEvent'] == -1){\n            window.open(placeholder.permalink);\n        }\n        else{\n            $('#feed-modal').show();\n            buildModal(showEvents[state['currentEvent']]);\n        }\n        \n      });\n    }\n    pageButton();\n  };\n  \n  function pageButton(){\n    $('#pagination-wrapper').empty();\n    let html = '';\n    let maxLeft = (state.page - Math.floor(state.window/2));\n    let maxRight = (state.page + Math.floor(state.window/2));\n    if(maxLeft < 1){\n        maxLeft = 1;\n        maxRight = state.window;\n    }\n    if(maxRight > state.pageNum){\n        maxLeft = state.pageNum - (state.window - 1);\n        maxRight = state.pageNum;\n        if(maxLeft < 1){\n            maxLeft = 1;\n        }\n    }\n    for(let page = maxLeft; page <= maxRight; page++){\n        html += '<button value = '+page+' class = page-button>'+page+'</button>';\n    }\n    if (state.page != 1) {\n        html = '<button value='+1+' class = \"page-button\">&#171; First</button>' + html;\n    }\n\n    if (state.page != state.pageNum) {\n        html += '<button value='+state.pageNum+' class=\"page-button\">Last &#187;</button>';\n    }\n    $('#pagination-wrapper').append(html);\n    $('.page-button').on('click', function(){\n        state.page = Number($(this).val());\n        pagination();\n        $('.page-button').filter(function(){return this.value==state.page}).addClass('current-page');\n    });\n    \n  };\n    \n  // create html for object.\n  function buildEvent(obj,count) {\n    let html = '<div class=\"event'+params['wide']+'\" style=\"flex:0 0 '+(100/state.elementPerRow)+'%\">';\n    let image_url = (obj.image_url) ? obj.image_url: \"https://events.umich.edu/images/default190@2x.png\";\n    let image = '<a class = \"image-link\" href ='+obj.permalink+'><div class = \"event-image'+params['wide']+'\" style=\"background-image: url('+image_url+')\"></div></a>';\n    let title = obj.event_title;\n    let date = obj.date_start;\n    let links = obj.links;\n    let location_name = obj.location_name;\n    html += image;\n    html += '<div class = \"event-text'+params['wide']+'\">';\n    if(config['pop-up']) html += '<button value = \"'+count+'\" class = \"event-title\"><h3>'+title+'</h3></button>';\n    else html += '<a href ='+obj.permalink+'><h3>'+title+'</h3></a>';\n    if(date){\n      html += '<ul><li><i class=\"fa fa-fw fa-calendar\"></i><span> Date: '+date+'</span></li>';\n    }\n    if(location_name) \n      html+= '<li><i class=\"fa fa-location-arrow fa-fw\"></i><span> Location: '+location_name+'</span></li></ul>';\n    for(let i = 0; i < Object.keys(links).length; i++){\n      let defaultTitle = (links[i].url.split(\"://\"))[1];\n      defaultTitle = (defaultTitle.split('/'))[0];\n      let text = links[i].title == null ? defaultTitle: links[i].title;\n      link = '<i class=\"fa fa-link fa-fw maize\"></i><a href = '+links[i].url+'> '+text + '</a><br>';\n      if(i % 2 == 0){\n        html += '<div class = feed-container>';\n      }\n      html+= '<div class = \"link-container\">'+link+'</div>';\n      if(i % 2 != 0 || i == Object.keys(links).length-1){\n      html += '</div>';\n      }\n    }\n    html += '</div>';\n    // When the user clicks the buttons, open the modal \n    if(config[\"pop-up\"]&&count != -1) html += '<button value = \"'+count+'\" class = \"event-modal-button\">Read More</button>';\n    html += '</div>';\n    return html;\n  };\n\n  function buildModal(obj){\n    let titles = '<h2>'+obj.event_title+'</h2>';\n    let image_url = (obj.image_url) ? obj.image_url: \"https://events.umich.edu/images/default190@2x.png\";\n    let html = '<div class = \"feed-modal-side\">';\n    let hours = obj.time_start.substring(0,2);\n    let minutes = obj.time_start.substring(3,5);\n    let ampm = parseInt(hours) >= 12 ? 'pm' : 'am';\n    let strStartTime;\n    let strEndTime;\n    $('#feed-modal-header h2, #feed-modal-header h4').remove();\n    $('#feed-modal-body').empty();\n    $('#feed-modal-event-link').remove();\n    if(obj.event_subtitle != \"\") titles += '<h4>'+obj.event_subtitle+'</h4>';\n    $('#feed-modal-header').append(titles);\n    html += '<div class = \"feed-modal-image\" style=\"background-image: url('+image_url+')\"></div>';\n    if($( window ).width() > 800) html += buildModalLinks(obj);\n    html += '</div>';\n    html += '<div class = \"feed-modal-main\"><div class= \"feed-modal-text\">';\n    html += obj.description;\n    html += '</div><hr><ul><li><i class=\"fa fa-fw fa-calendar\"></i>';\n    html += '<span> '+obj.date_start.replaceAll('-', '/')+'</span></li>';\n    hours = ((hours + 11) % 12 + 1);\n    strStartTime = hours + ':' + minutes + ampm;\n    hours = obj.time_end.substring(0,2);\n    minutes = obj.time_end.substring(3,5);\n    ampm = parseInt(hours) >= 12 ? 'pm' : 'am';\n    hours = ((hours + 11) % 12 + 1);\n    strEndTime = hours + ':' + minutes + ampm;\n    html += '<li><i class=\"fa fa-fw fa-clock-o\"></i><span> '+strStartTime+' - '+strEndTime+'</span></li>';\n    if(obj.location_name) html += '<li><i class=\"fa fa-location-arrow fa-fw\"></i><span> Location: '+obj.location_name+'</span></li>';\n    html += '</ul></div>';\n    if($( window ).width() <= 800) html += buildModalLinks(obj);\n    $('#feed-modal-body').append(html);\n    $('#feed-modal-body').after('<a id = \"feed-modal-event-link\" href ='+obj.permalink+'>View on Happening @ Michigan'+'</a>');\n  };\n\n  function buildModalLinks(obj){\n    let links = obj.links;\n    let linkHtml = \"\";\n    if(Object.keys(links).length > 0){\n      linkHtml += '<div class = \"small-title\">related link</div>';\n      for(let i = 0; i < Object.keys(links).length; i++){\n        let defaultTitle = (links[i].url.split(\"://\"))[1];\n        defaultTitle = (defaultTitle.split('/'))[0];\n        let text = links[i].title == null ? defaultTitle: links[i].title;\n        link = '<i class=\"fa fa-link fa-fw blue\"></i><a class = \"feed-modal-link\" href = '+links[i].url+'> '+text + '</a><br>'\n        linkHtml+= link;\n      }\n    }\n    return linkHtml;\n  };\n\n  function search(){\n    if(!$(\"#search-input\").val()){\n      showEvents = filteredEvents;\n    }\n    else{\n      let value = $(\"#search-input\").val().toLowerCase();\n      let eventSet = new Set();\n      let count = 0;\n      showEvents = filteredEvents.filter(obj => obj.event_type.toLowerCase().includes(value));\n      for(let i = count; i < Object.keys(showEvents).length; i++) eventSet.add(showEvents[i].id);\n      count = Object.keys(showEvents).length;\n      showEvents = showEvents.concat(filteredEvents.filter(obj => obj.tags.find(element => element.toLowerCase().includes(value))&& !eventSet.has(obj.id)));\n      for(let i = count; i < Object.keys(showEvents).length; i++) eventSet.add(showEvents[i].id);\n      count = Object.keys(showEvents).length;\n      showEvents = showEvents.concat(filteredEvents.filter(obj => (obj.event_title.toLowerCase().includes(value)|| obj.building_name.toLowerCase().includes(value) || obj.description.toLowerCase().includes(value)) && !eventSet.has(obj.id)));\n    }\n    state['page'] = 1;\n    pagination();\n  };\n\n  function advanceSearchSetup(){\n    let advanceSearchHtml = '<div id = \"advance-search\" class = \"advance-search\"><div class = \"container-fluid\"><div class = \"row\">';\n    for(let i = 0; i < events.length; i ++){\n      for(let j = 0; j < events[i].tags.length; j++){\n        tagSet.add(events[i].tags[j]);\n      }\n      typeSet.add(events[i].event_type);\n    }\n    advanceSearchHtml += '<div class = \"col-sm-6 search-container\"><label for = \"search-start-date\">Start Date: </label><br><input type = \"date\" id = \"search-start-date\" class = \"search-date\"></div>';\n    advanceSearchHtml += '<div class = \"col-sm-6 search-container\"><label for = \"search-end-date\">End Date: </label><br><input type = \"date\" id = \"search-end-date\" class = \"search-date\"></div>';\n    advanceSearchHtml += '</div>';\n    advanceSearchHtml += '<div class = \"row type-row\"><div class = \"col-sm-6 search-container\">';\n    advanceSearchHtml += '<label for = \"type-checkbox\">Event types:</label><br>';\n    advanceSearchHtml += '<div class = \"search-checkbox-container\">';\n    typeSet.forEach(element => {\n      advanceSearchHtml += '<input type=\"checkbox\" class = \"type-checkbox\" value =\"'+element+'\"><label for=\"'+element+'\"> '+element+'</label><br>';\n    });\n    advanceSearchHtml += '</div></div>';\n    advanceSearchHtml += '<div class = \"col-sm-6 search-container\">';\n    advanceSearchHtml += '<label for = \"tag-checkbox\">Event tags:&nbsp</label><input id = \"tag-search-input\" class = \"tag-search-input\" type=\"text\" placeholder=\"Search Tags..\"></input><br>';\n    advanceSearchHtml += '<div class = \"search-checkbox-container\">';\n    tagSet.forEach(element => {\n      advanceSearchHtml += '<div><input type=\"checkbox\" class = \"tag-checkbox\" value =\"'+element+'\"><label for=\"'+element+'\" class = \"tag-label\"> '+element+'</label></div>';\n    });\n    advanceSearchHtml += '</div></div></div>';\n    advanceSearchHtml += '<div class = \"advance-search-button-container\"><button id = \"search-clear\" class = \"search-clear\">Clear Search</button><button id = \"advance-search-submit\" class = \"advance-search-submit\">Submit</button></div></div>';\n    $('#search-content').append(advanceSearchHtml);\n    $(\"#tag-search-input\").on(\"keyup\", function() {\n      tagSearch();\n    });\n    $('#advance-search-submit').on('click', function(){\n      $('#advance-search').stop().animate({ height: '0'}, animateTime);\n      advanceSearch();\n    });\n    $('#search-clear').on('click', function(){\n      clearSearch();\n    });\n  };\n\n  function advanceSearch(){\n    let typeChecked = new Set();\n    let tagChecked = new Set();\n    filteredEvents = events;\n    $(\".type-checkbox\").each(function(){\n      if($(this).is(':checked')) typeChecked.add($(this).val());\n    });\n    $(\".tag-checkbox\").each(function(){\n      if($(this).is(':checked')) tagChecked.add($(this).val());\n    });\n    if(typeChecked.size != 0){\n      filteredEvents = filteredEvents.filter(obj => typeChecked.has(obj.event_type));\n      if(tagChecked.size != 0) filteredEvents = filteredEvents.concat(events.filter(function(obj){\n        for(tag of obj.tags){\n          if(tagChecked.has(tag)) return true;\n        }\n        return false;\n      }));\n    }\n    else if(tagChecked.size != 0) filteredEvents = filteredEvents.filter(function(obj){\n      for(tag of obj.tags){\n        if(tagChecked.has(tag)) return true;\n      }\n      return false;\n    });\n    if($('#search-start-date').val()) filteredEvents = filteredEvents.filter(obj => obj.date_start >= $('#search-start-date').val());\n    if($('#search-end-date').val()) filteredEvents = filteredEvents.filter(obj => obj.date_start <= $('#search-end-date').val());        \n    search();\n  };\n\n  function tagSearch(){\n    let value = $(\"#tag-search-input\").val().toLowerCase();\n    $('.tag-checkbox').filter(function() {\n      $(this).toggle($(this).val().toLowerCase().indexOf(value) > -1);\n    });\n    $('.tag-label').filter(function() {\n      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);\n    });\n  };\n\n  function clearSearch(){\n    $('#search-start-date').val(\"\");\n    $('#search-end-date').val(\"\");\n    $('input:checkbox').each(function(){\n      $(this).prop(\"checked\", false);\n    });\n    $('#tag-search-input').val(\"\");\n    $(\"#search-input\").val(\"\");\n    filteredEvents = events;\n    search();\n  };\n\n  /* Function to animate height: auto */\n  function autoHeightAnimate(element, time){\n    let curHeight = element.height(); // Get Default Height\n    let autoHeight = element.css('height', 'auto').height(); // Get Auto Height\n    element.height(curHeight); // Reset to Default Height\n    element.stop().animate({ height: autoHeight }, time, function(){$('#advance-search').css(\"height\", \"auto\");}); // Animate to Auto Height\n  };\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feed);\n\n//# sourceURL=webpack://postfun/./js/feed.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _feed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feed.js */ \"./js/feed.js\");\n\n\nfunction fetchPodcastFeed() {\n  const feedUrl = \"https://feeds.castos.com/owg73\";\n  const feed = new _feed_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ url: feedUrl });\n  feed.load((err, items) => {\n    if (err) {\n      console.error(\"Error fetching RSS feed:\", err);\n    } else {\n      populateEpisodeList(items);\n    }\n  });\n}\n\nfunction populateEpisodeList(episodes) {\n  const episodeList = document.getElementById(\"episode-list\");\n  for (const episode of episodes) {\n    const episodeItem = document.createElement(\"li\");\n\n    const titleElement = document.createElement(\"h3\");\n    titleElement.textContent = episode.title;\n    episodeItem.appendChild(titleElement);\n\n    const descriptionElement = document.createElement(\"p\");\n    descriptionElement.textContent = episode.description;\n    episodeItem.appendChild(descriptionElement);\n\n    const playerContainer = document.createElement(\"div\");\n    playerContainer.setAttribute(\"data-plyr-provider\", \"podcast\");\n    playerContainer.setAttribute(\"data-plyr-embed-id\", \"episode-\" + episode.id);\n    episodeItem.appendChild(playerContainer);\n\n    episodeList.appendChild(episodeItem);\n  }\n}\n\nfetchPodcastFeed();\n\nPlyr.setup().then(() => {\n  const playerContainers = document.querySelectorAll(\"[data-plyr-provider]\");\n  playerContainers.forEach(container => {\n    const player = new Plyr(container);\n    // Additional configuration for each player if needed\n  });\n});\n  \n\n//# sourceURL=webpack://postfun/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;