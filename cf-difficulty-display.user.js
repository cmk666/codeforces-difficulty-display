// ==UserScript==
// @name         Codeforces Difficulty Display
// @version      0.1
// @description  Codeforces Difficulty Display
// @author       cmk666
// @match        https://codeforces.com/contest/*
// @match        https://codeforces.ml/contest/*
// @match        https://codeforc.es/contest/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codeforces.com
// @grant        none
// ==/UserScript==

(() => {
	var insertAfter = (x, y) => {
		var z = y.parentNode;
		if ( z.lastChild == y ) z.appendChild(x);
		else z.insertBefore(x, y.nextSibling);
	};
	var url = location.href;
	var cid = url.substr(9 + url.indexOf('/contest/'));
	if ( !/[1-9]\d+/.test(cid) ) return;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/contest.standings?from=1&count=1&contestId=' + cid);
	xhr.send();
	xhr.onreadystatechange = () => {
		if ( xhr.readyState == 4 && xhr.status == 200 ) {
			var data = JSON.parse(xhr.responseText);
			if ( data.status == 'OK' ) {
				var pro = data.result.problems;
				var ori = document.querySelector(
					'#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr > th.top.right');
				var ele = document.createElement('th');
				ele.innerText = 'Difficulty';
				ele.style.width = '5em';
				ele.classList = ori.classList;
				ori.classList.remove('right');
				insertAfter(ele, ori);
				ori = document.querySelectorAll(
					'#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr > td.right');
				for ( var i = 0 ; i < ori.length ; i++ ) {
					var dif = pro[i].rating;
					if ( dif == undefined ) dif = '';
					ele = document.createElement('td');
					ele.innerText = dif;
					ele.classList = ori[i].classList;
					ori[i].classList.remove('right');
					insertAfter(ele, ori[i]);
				}
			}
		}
	};
})();