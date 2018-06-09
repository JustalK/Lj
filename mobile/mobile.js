document.addEventListener("DOMContentLoaded", function() {
	// Alias for winning some extrabyte
	const $i = id => document.getElementById(id);
	const $n = cn => document.getElementsByClassName(cn);
	var bgswitch = $n("bgswitch");
	var second = $i("SECOND");
	var close = $n("close");
	var tmp,ek,srck,vk;
	
	for(var i=bgswitch.length;i--;) {
		bgswitch[i].addEventListener('touchstart', function(e) {
			ek = e.target, srck = ek.dataset.src, vk = ek.value;
			tmp = new Image();
			tmp.src = srck;
			tmp.addEventListener('load',function() {
				this.style.backgroundImage = "url("+this.dataset.src+")";
				this.classList.add("active");
				second.classList.add("active");
			}.bind(ek));
		});
	}
	
	for(var i=close.length;i--;) {
		close[i].addEventListener('touchstart', function(e) {
			second.classList.remove("active");
		});
	}
	
});