$(document).ready(function() {
	var qId = $("[id^=javatbd]")[0].id.substring(0,21);
	$("<p><strong>Yes, about politics or government in:</strong></p>").insertAfter("#" + qId + "ANO");
});