function DOMUtils() {
}

DOMUtils.swapClass = function(element, oldClassName, newClassName) {
	DOMUtils.removeClass(element, oldClassName);
	DOMUtils.addClass(element, newClassName);
};

DOMUtils.addClass = function(element, className) {
	var classNames = element.getAttribute('class');
	if (classNames != null && classNames != '') {
		var classes = classNames.split(' ');
		var length = classes.length;
		for (var i = 0 ; i < length ; i++) {
			var clazz = classes[i];
			if (clazz == className) {
				return;
			}
		}
		var newClassNames = classNames + ' ' + className;
		element.setAttribute('class', newClassNames);
	} else {
		element.setAttribute('class', className);	
	}
};

DOMUtils.removeClass = function(element, className) {
	var classNames = element.getAttribute('class');
	if (classNames != null) {
		var classes = classNames.split(' ');
		var length = classes.length;
		for (var i = 0 ; i < length ; i++) {
			var clazz = classes[i];
			if (clazz == className) {
				classes[i] = '';
				break;
			}
		}
		var newClassNames = classes.join(' ');
		element.setAttribute('class', newClassNames);
	}
};

DOMUtils.truncTable = function(table, newSize) {
	var length = table.rows.length;
	while(length > newSize) {
		table.deleteRow(length - 1);
		length = table.rows.length;
	}
};
