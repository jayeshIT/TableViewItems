var joblist = [];
//var jobname = ['Tyres', 'Tubes', 'Pumps', 'Breaks', 'Cluctches', 'Karburators', 'SparkPlugs', 'Drummers', 'Motors', 'Rorators', 'Engines', 'Chechis', 'Couplees'];
var jobname = ['Tyres', 'Tubes', 'Pumps', 'Breaks', 'Cluctches', 'Karburators', 'SparkPlugs', 'Drummers', 'Motors', 'Rorators', 'Engines', 'Chechis', 'Couplees'];
for (var i = 0; i < jobname.length; i++) {

	var tblRow = Titanium.UI.createTableViewRow({
		height : 50,
		left : 0,
		right : 0,
		title : jobname[i]
	});
	joblist.push(tblRow);

}
$.tblView.setData(joblist);
$.tblView.addEventListener('click', function(e) {
	var title = e.row.title;
	var job_win = Alloy.createController('win_job', {
		title : title
	}).getView().open();
});
