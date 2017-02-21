$(window).on('load', function() {
	$('.option').on('mouseenter', function() {
		var val = $(this).data('val');
		$('.details').hide();
		$('.details[data-val="' + val + '"]').show();
	});

	$('.option').on('mouseleave', function() {
		$('.details').hide();
		$('#emptyDetails').show();
	});

	$('.option').on('click', function() {
		var checked = !$(this).data('s');
		$(this).data('s', checked);
		$(this).children('i').toggleClass('text-muted text-success fa-check-circle fa-times-circle-o');
		console.log($(this).data('s'));
	});
});
