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
	var url = location.href;
	var cid = url.substr(9 + url.indexOf('/contest/'));
	if ( !/^\d+$/.test(cid) ) return;
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
				var txt = document.createElement('img');
				txt.src = '/images/icons/lightning-16x16.png';
				txt.title = 'Difficulty';
				var ele = document.createElement('th');
				ele.appendChild(txt);
				ele.style.width = '2.5em';
				ele.style.fontSize = '2rem';
				ele.classList = ori.classList;
				ele.classList.remove('right');
				ori.parentNode.insertBefore(ele, ori);
				txt = document.createElement('img');
				txt.src = '/images/icons/ok-16x16.png';
				txt.title = 'Solved';
				ori.appendChild(txt);
				ori = document.querySelectorAll(
					'#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr > td.right');
				for ( var i = 0 ; i < ori.length ; i++ ) {
					var dif = pro[i].rating;
					if ( dif == undefined ) dif = '';
					txt = document.createElement('span');
					txt.title = 'Difficulty';
					txt.style.fontSize = '1.1rem';
					txt.style.padding = '.2em .35em';
					txt.style.opacity = '.9';
					txt.style.fontWeight = 'bold';
					txt.innerText = dif;
					ele = document.createElement('td');
					ele.appendChild(txt);
					ele.fontSize = '1.1rem';
					ele.classList = ori[i].classList;
					ele.classList.remove('right');
					ori[i].parentNode.insertBefore(ele, ori[i]);
				}
			}
		}
	};
})();
