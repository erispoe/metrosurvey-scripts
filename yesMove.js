$(document).ready(function() {
	var qId = $("[id^=javatbd]")[0].id.substring(0,21);
	$("<p><strong>Yes, I would like to move, but stay in:</strong></p>").insertAfter("#" + qId + "ANO");
	$("<p><strong>Yes, I would like to move to:</strong></p>").insertAfter("#" + qId + "ACOR");
});