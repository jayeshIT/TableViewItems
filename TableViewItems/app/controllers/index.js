var btn = Titanium.UI.createButton({
	top : 25,
	left : 10,
	title : 'Click Me'
});
btn.addEventListener('click', function(e) {
	var win_home = Alloy.createController('win_home').getView().open();
});
$.index.add(btn);
$.index.open();

