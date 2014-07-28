
(function() {

	function doSearch(keywords) {
		var pesquisarResult = document.getElementById('pesquisar-result');
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
