var args = arguments[0] || {};
Ti.API.info('-------- TITLE------' + args.title);
var data = [];
var job_id;
var chan_first = true;
var chan_first1 = true;
var check_con = function() {
	var db = Titanium.Database.install('/jobs.db', 'jobs');
	var monthyear = db.execute("select * from jobslist where jobname=?", args.title);
	var len = monthyear.getRowCount();
	Ti.API.info('----- LEN JOB ID---------:' + len);
	if (len > 0) {
		job_id = monthyear.fieldByName('jobid');
		Ti.API.info('----- job_id---------:' + job_id);
		$.scroll1.visible = false;
	} else {
		$.scroll1.visible = true;
	}
	monthyear.close();
	db.close();
};
check_con();
$.add_button.addEventListener('click', function(e) {
	if ($.txtcode.value == '' || $.txtcode.value.trim().length == 0) {
		alert('Enter code ');
		return;
	}
	var db = Titanium.Database.install('/jobs.db', 'jobs');
	db.execute("insert into jobslist(jobid,jobname)values(?,?)", $.txtcode.value, args.title);
	db.close();
	$.scroll1.visible = false;
	check_con();
});
$.btn1.addEventListener('click', function(e) {
	$.container.close();
});

var get_Row = function() {
	var total = 5;
	var db = Titanium.Database.install('/jobs.db', 'jobs');
	var qr = db.execute("select * from que_list");
	var total_data = qr.fieldByName('total');
	Ti.API.info('======= TOTAL ROWS: ' + total_data);
	if (total_data == 0) {
		Ti.API.info("====Update total data===");
		db.execute('UPDATE que_list SET total=?', total);
	}
	qr.close();
	db.close();

	var db = Titanium.Database.install('/jobs.db', 'jobs');
	for (var i = 0; i < total; i++) {
		var tableViewRow = Titanium.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL,
			selectionStyle : (OS_IOS) ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : '',
			layout : 'vertical',
			backgroundColor : 'transparent'
		});
		var check = db.execute("select jobid from que_list where jobid=?", i);
		var len = check.getRowCount();
		if (len > 0) {
			Ti.API.info('----- CHECK LEN > 0 SO YELLOW');
			tableViewRow.backgroundColor = 'yellow';
			var qr = db.execute("select * from que_list");
			var total_data = qr.fieldByName('total');
			Ti.API.info('======= TOTAL TO UPDATE: ' + total_data);
			total_data = (parseInt(total_data) - 1);
			db.execute('update que_list set total=?', total_data);
		} else {
			Ti.API.info('----- CHECK LEN < 0 SO NOT YELLOW');
		}
		check.close();
		var lbl = Titanium.UI.createLabel({
			top : 5,
			font : {
				fontSize : 16
			},
			color : 'black'
		});
		var view = Titanium.UI.createView({
			top : 5,
			height : 5,
			left : 0,
			right : 0,
			backgroundColor : 'transoparent'
		});
		if (i == 0) {
			lbl.text = 'Enter Name';
			var txtBox = Titanium.UI.createTextField({
				top : 10,
				width : 250,
				height : 40,
				hintText : 'Enter name:',
				returnKeyType : Ti.UI.RETURNKEY_DONE,
				borderColor : 'gray',
				borderRadius : 2,
				borderRadius : 5,
				borderWidth : 1.5,
				paddingLeft : "5",
				backgroundColor : "white",
				autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
				cust_prop : 'txtbox',
				customeID : i
			});
			tableViewRow.add(lbl);
			tableViewRow.add(txtBox);
			tableViewRow.add(view);
			txtBox.addEventListener('return', function(e) {
				Ti.API.info('------- in return------');
				if (txtBox.value.trim().length == 0 || txtBox.value == '') {
					alert('Please enter data');
				} else {

					sendData(txtBox.customeID, total_data);
				}
			});
		}
		if (i == 1) {
			lbl.text = 'Enter Address';
			var txtArea = Titanium.UI.createTextArea({
				top : 10,
				height : 100,
				width : 250,
				color : "black",
				borderColor : "gray",
				borderRadius : 5,
				borderWidth : 1.5,
				autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
				cust_prop : 'txtarea',
				customeID : i
			});
			txtArea.color = "#a3aab1";
			txtArea.value = "Enter Address";
			txtArea._hintText = txtArea.value;
			txtArea.addEventListener('focus', function(e) {
				cur_focus_element = txtArea;
				if (e.source.value == e.source._hintText) {
					e.source.value = "";
				}
				txtArea.color = "black";
			});
			//-----------------------------Classified Description Textarea return Event-------------------------------------------
			txtArea.addEventListener('return', function(e) {
				if (e.source.value == "" || txtArea.value.trim().length == 0) {

					txtArea.color = "#a3aab1";
					txtArea.value = "Enter Address";
					txtArea._hintText = txtArea.value;

				} else {
					sendData(txtArea.customeID, total_data);
				}

			});
			tableViewRow.add(lbl);
			tableViewRow.add(txtArea);
			tableViewRow.add(view);
		}
		if (i == 2) {
			lbl.text = 'Are you agree?';
			var chk_img = Titanium.UI.createImageView({
				top : 10,
				height : 26,
				width : 26,
				image : '/checkmarkBox.png',
				cust_prop : 'chk_box',
				customeID : i
			});
			chk_img.addEventListener('click', function(e) {
				if (e.source.image === '/checkmarkBox.png') {
					e.source.image = '/checkmark.png';
					sendData(chk_img.customeID, total_data);
				} else {
					e.source.image = '/checkmarkBox.png';
					sendData(chk_img.customeID, total_data);
				}
			});
			tableViewRow.add(lbl);
			tableViewRow.add(chk_img);
			tableViewRow.add(view);
		}
		if (i == 3) {
			lbl.text = 'Select age.';
			var basicSlider = Titanium.UI.createSlider({
				top : 10,
				min : 0,
				max : 100,
				value : 5,
				width : 300,
				height : 'auto',
				cust_prop : 'slider',
				customeID : i
			});
			tableViewRow.add(lbl);
			tableViewRow.add(basicSlider);
			tableViewRow.add(view);
			basicSlider.addEventListener('change', function(e) {
				setTimeout(function(er) {
					if (chan_first == false) {
						sendData(basicSlider.customeID, total_data);
					}
					if (chan_first == true) {
						chan_first = false;
					}
				}, 500);
			});
		}
		if (i == 4) {
			var basicSwitch = Titanium.UI.createSwitch({
				value : false,
				top : 10,
				cust_prop : 'switch',
				customeID : i
			});
			tableViewRow.add(lbl);
			tableViewRow.add(basicSwitch);
			tableViewRow.add(view);
			basicSwitch.addEventListener('change', function(e) {

				sendData(basicSwitch.customeID, total_data);

			});
		}
		data.push(tableViewRow);
	}
	if (db != null) {
		db.close();
		db = null;
	}
};

get_Row();

$.tableView.setData(data);
var sendData = function(que_id, total_data) {

	Ti.API.info('----------------------------------sendData----------------------------');
	Ti.API.info('----------------------------------que_id----------------------------' + que_id);
	Ti.API.info('----------------------------------total_data----------------------------' + total_data);

	var db = Titanium.Database.install('/jobs.db', 'jobs');
	var check = db.execute("select jobid from que_list where jobid=?", que_id);
	var len = check.getRowCount();
	if (len > 0) {
		Ti.API.info('-sendData len > 0--');
	} else {
		Ti.API.info('-sendData len  < 0--');
		db.execute("insert into que_list(total,jobid)values(?,?)", total_data, que_id);
		var qr = db.execute("select * from que_list");
		var total_data = qr.fieldByName('total');
		Ti.API.info('======= TOTAL TO UPDATE: ' + total_data);
		total_data = (parseInt(total_data) - 1);
		db.execute('update que_list set total=?', total_data);
		qr.close();
	}
	check.close();
	db.close();

};
$.done_button.addEventListener('click', function(e) {

	var db = Titanium.Database.install('/jobs.db', 'jobs');
	var qr = db.execute("select * from que_list");
	var total_data = qr.fieldByName('total');
	Ti.API.info('======= TOTAL ROWS: ' + total_data);
	if (total_data == 0) {
		alert('Done');
		db.execute('delete from que_list where jobid!=?', 'ty');
		db.close();
		$.container.close();
	} else {
		alert('Plase answer remanied question');
	}
	qr.close();
	db.close();
});

$.topView.addEventListener('click', function(e) {
	for (var i = 0; i < data.length; i++) {
		try {
			if (data[i].children[1].cust_prop == 'txtbox') {
				Ti.API.info('--- TextBox value:' + data[i].children[1].value);
			}
			if (data[i].children[1].cust_prop == 'txtarea') {
				Ti.API.info('--- TextBox value:' + data[i].children[1].value);
			}
			if (data[i].children[1].cust_prop == 'chk_box') {
				Ti.API.info('------chk_box-----:' + data[i].children[1].image);
			}
			if (data[i].children[1].cust_prop == 'slider') {
				Ti.API.info('------slider-----:' + data[i].children[1].value);
			}
			if (data[i].children[1].cust_prop == 'switch') {
				Ti.API.info('------switch-----:' + data[i].children[1].value);
			}
		} catch(ex) {
			Ti.API.info('-ex:' + ex);
		}
	}
});

