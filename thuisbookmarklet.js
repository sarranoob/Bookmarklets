var done = false;
var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
script.onload = script.onreadystatechange = function(){
	if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
		done = true;
		initMyBookmarklet();
	}
};
document.getElementsByTagName("head")[0].appendChild(script);

function initMyBookmarklet() {
	(function() {

		var assetpath = $('.js-playBtn').data('assetpath');


		var url = window.location.href;
		url = url.substring(0, url.length - 1);
		url += '.securevideo.json';

		$.ajax({
			url: url,
			type: 'get',
			success: function(data, textStatus, jqXHR) {
				success1(data[assetpath].mzid);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('error');
			}
		});
	})();
}

function success1(mzid) {
	$.ajax({
		url: 'https://mediazone.vrt.be/api/v1/vrtvideo/assets/' + mzid,
		type: 'get',
		success: function(data, textStatus, jqXHR) {
			$('.cq-dd-vrtvideo').html('<video class="vrtvideo betterPlayer" controls><source id="videoSource" src="' + data.targetUrls[0].url + '"></video>');
			$(window).keypress(function (e) {
				e.preventDefault();
				var vid = $('.betterPlayer')[0];
				if (e.keyCode === 32) {
					if(vid.paused) {
						vid.play();
					} else {
						vid.pause();
					}
				} else if (e.keyCode === 70 || e.keyCode === 102) {
					// fullscreen
					if(vid.webkitDisplayingFullscreen) {
						document.webkitExitFullscreen();
					} else {
						vid.webkitRequestFullscreen();
					}
				}
			});
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	});
}