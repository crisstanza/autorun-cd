
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
				row.insertCell(0).innerHTML = (i+1) + ') ' + trabalho._e.replace(new RegExp(keywords, 'gi'), '<b>$&</b>');
				var titleTmp = [];
				if ( trabalho._a != '' ) {
					titleTmp.push('\xC1rea: ' + trabalho._a);
				}
				if ( trabalho._f != '' ) {
					titleTmp.push('Co-autores: ' + trabalho._f);
				}
				row.cells[0].setAttribute('title', titleTmp.join('\n'));
				row.insertCell(1).innerHTML = trabalho._d.replace(new RegExp(keywords, 'gi'), '<b>$&</b>');
				row.cells[1].setAttribute('title', titleTmp.join('\n'));
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

	function paginate(resultFull, page, pageSize) {
		return resultFull.slice(pageSize * (page - 1), pageSize);
	}

	function doSearch(keywords, page, pageSize) {
		var pesquisarResult = document.getElementById('pesquisar-result');
		var tableResult = document.getElementById('table-result');
		var resultFull = filter(MainIndex.trabalhos, keywords);
		var resultPaged = paginate(resultFull, page, pageSize);
		DOMUtils.truncTable(tableResult, 1);
		appendResult(tableResult, resultPaged, keywords);
		DOMUtils.swapClass(pesquisarResult, 'Hide', 'Show');
	}

	function init() {
		var formSearch = document.getElementById('form-search');
		formSearch.addEventListener('submit', function() {
			var keywords = formSearch.keywords.value;
			var page = formSearch.page.value;
			var pageSize = formSearch.pageSize.value;
			doSearch(keywords, page, pageSize);
		}, false);
	}

	window.addEventListener('load', init, false);

})();
