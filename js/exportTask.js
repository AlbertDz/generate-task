const exportTask = {
	taskExport: function(title, description) {
		var blob = new Blob([description], {type: "text/plain;charset=utf-8"});

		saveAs(blob, `${title}.txt`);
	}
}