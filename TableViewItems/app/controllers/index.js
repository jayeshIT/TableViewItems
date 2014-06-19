var data = [];

for (var i = 0; i < 5; i++) {
	var tableViewRow = Titanium.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		selectionStyle : (OS_IOS) ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : '',
		layout : 'vertical',
		backgroundColor : 'transparent'
	});
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
			cust_prop : 'txtbox'
		});
		tableViewRow.add(lbl);
		tableViewRow.add(txtBox);
		tableViewRow.add(view);
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
			cust_prop : 'txtarea'
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
				if (OS_IOS) {
					txtArea.color = "#a3aab1";
					txtArea.value = "Enter Address";
					txtArea._hintText = txtArea.value;
				} else {
					txtArea.value = "";
				}
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
			cust_prop : 'chk_box'
		});
		chk_img.addEventListener('click', function(e) {
			if (e.source.image === '/checkmarkBox.png') {
				e.source.image = '/checkmark.png';
			} else {
				e.source.image = '/checkmarkBox.png';
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
			cust_prop : 'slider'
		});
		tableViewRow.add(lbl);
		tableViewRow.add(basicSlider);
		tableViewRow.add(view);
	}
	if (i == 4) {

		var basicSwitch = Titanium.UI.createSwitch({
			value : false,
			top : 10,
			cust_prop : 'switch'
		});
		tableViewRow.add(lbl);
		tableViewRow.add(basicSwitch);
		tableViewRow.add(view);
	}
	data.push(tableViewRow);
}
$.tableView.setData(data);

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

$.index.open();

