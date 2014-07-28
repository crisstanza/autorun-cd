
(function() {

	function appendResult(table, result, keywords) {
		if(result.length == 0) {
			DOMUtils.swapClass(document.getElementById('no-result'), 'Hide', 'Show');
			DOMUtils.swapClass(table, 'Show', 'Hide');
		} else {
			DOMUtils.swapClass(document.getElementById('no-result'), 'Show', 'Hide');
			for(var i = 0 ; i < result.length ; i++ ) {
				var length = table.rows.length;
				var row = table.insertRow(length);
				var trabalho = result[i];
				row.insertCell(0).innerHTML = trabalho._e.replace(new RegExp(keywords, 'gi'), '<b>$&</b>');
				var titleTmp = [];
				if ( trabalho._a != '' ) {
					titleTmp.push('\xC1rea: ' + trabalho._a);
				}
				if ( trabalho._f != '' ) {
					titleTmp.push('Co-autores: ' + trabalho._f);
				}
				row.cells[0].setAttribute('title', titleTmp.join('\n'));
				row.insertCell(1).innerHTML = trabalho._d.replace(new RegExp(keywords, 'gi'), '<b>$&</b>');
				row.insertCell(2).innerHTML = '<a href="./docs/' + trabalho._b + '.docx" target="_blank">baixar</a>';
			}
			DOMUtils.swapClass(table, 'Hide', 'Show');
		}
	}

	function filter(trabalhos, keywords) {
		var result = [];
		for(var i = 0 ; i < trabalhos.length ; i++ ) {
			var trabalho = trabalhos[i];
			var indexEntry = (trabalho._d + ' ' + trabalho._e + ' ' + trabalho._f).toLowerCase()
			if(indexEntry.indexOf(keywords.toLowerCase()) >= 0) {
				result.push(trabalho);
			}
		}
		return result;
	}

	function doSearch(keywords) {
		var pesquisarResult = document.getElementById('pesquisar-result');
		var tableResult = document.getElementById('table-result');
		var result = filter(MainIndex.trabalhos, keywords);
		DOMUtils.truncTable(tableResult, 1);
		appendResult(tableResult, result, keywords);
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
