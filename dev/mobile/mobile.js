document.addEventListener("DOMContentLoaded", function() {
	// Alias for winning some extrabyte
	const $i = id => document.getElementById(id);
	const $n = cn => document.getElementsByClassName(cn);
	
	var bgswitch = $n("bgswitch");
	var second = $i("SECOND");
	var informations = $i("INFORMATIONS");
	var close = $n("close");
	var tmp,ek,srck,vk;
	
	// For each element that we can access for some informations about it
	for(var i=bgswitch.length;i--;) {
		bgswitch[i].addEventListener('touchstart', function(e) {
			ek = e.target, srck = ek.dataset.src, vk = ek.value;
			tmp = new Image();
			tmp.src = srck;
			// We load the active background
			tmp.addEventListener('load',function() {
				this.style.backgroundImage = "url("+this.dataset.src+")";
				this.classList.add("active")
				// we make a XHTTP request for getting the informations about this page
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						informations.innerHTML = this.responseText;
						second.classList.add("active");
					}
				};
				xhttp.open("GET", "./templates/"+this.dataset.link+".html", true);
				xhttp.send();
				
			}.bind(ek));
		});
	}
	
	// For closing the event 
	for(var i=close.length;i--;) {
		close[i].addEventListener('touchstart', function(e) {
			second.classList.remove("active");
		});
	}
	
});