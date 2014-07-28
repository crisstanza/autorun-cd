
(function() {

	function appendResult(table, result) {
		for(var i = 0 ; i < result.length ; i++ ) {
			var length = table.rows.length;
			var row = table.insertRow(length);
			var trabalho = result[i];
			row.insertCell(0).innerHTML = trabalho._e;
			row.insertCell(1).innerHTML = trabalho._d;
			row.insertCell(2).innerHTML = '<a href="./docs/' + trabalho._b + '.docx" target="_blank">baixar</a>';
		}
	}

	function filter(trabalhos, keywords) {
		return trabalhos;
	}

	function doSearch(keywords) {
		var pesquisarResult = document.getElementById('pesquisar-result');
		var tableResult = document.getElementById('table-result');
		var result = filter(MainIndex.trabalhos, keywords);
		DOMUtils.truncTable(tableResult, 1);
		appendResult(tableResult, result);
		DOMUtils.swapClass(pesquisarResult, 'Hide', 'Show');
	}

	function init() {
		var formSearch = document.getElementById('form-search');
		formSearch.addEventListener('submit', function() {
			var keywords = formSearch.keywords.value;
			doSearch(keywords);
		}, false);
	}

	window.addEventListener('load', init, false);

})();
