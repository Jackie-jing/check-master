

function clearText(){
	 $("#textarea").val("").focus(); // 清空并获得焦点

}

function checknow(){
	var a=$("#textarea").val();
	//var a = document.getElementById("textarea").value; 
	//console.log(a);
	var imgs=$(".tr>td>img");
	var titleImg=imgs[0];
	var discritionImg=imgs[1];
	var canonicalImg = imgs[2];
	var emptyurlImg = imgs[3];
	var ctaButton = imgs[4];
	
	//get the title 
	var title = a.indexOf("<title>"); 
	var lastTitle = a.lastIndexOf("</title>"); 
	//document.write("Title: " + a.slice(title+7,lastTitle) + "<br /><br />"); 
	var titleLength = a.slice(title+7,lastTitle);	

	if(titleLength.length == 0 || title == -1){
		titleImg.src = "imgs/no.png";
	}else{
		titleImg.src = "imgs/yes.png";
	}

	//get the discription 
	var disStr='name="description" content="'; 
	var discription = a.indexOf(disStr); //-1
	//console.log(discription);
	var lastDis = a.indexOf('"/>',discription); //-1
	//console.log(lastDis);
	//document.write("Discription:" + a.slice(discription + disStr.length, lastDis) + "<br /><br />"); 
	var discriptionLength = a.slice(discription + disStr.length, lastDis);

	if(discriptionLength.length == 0 || discription == -1){
		discritionImg.src = "imgs/no.png";
	}else{
		console.log(discriptionLength);
		discritionImg.src = "imgs/yes.png";
	}


	//get canonical 
	var canonicalStr = 'rel="canonical" href='; 
	var canonical = a.indexOf(canonicalStr); 
	var lastCan = a.indexOf('/>',canonical); 
	// document.write("Canonical:" + a.slice(canonical + canonicalStr.length, lastCan) + "<br /><br />"); 
	var canonicalLength = a.slice(canonical + canonicalStr.length, lastCan);
	if(canonicalLength.length == 0 || canonical == -1){
		canonicalImg.src = "imgs/no.png";
	}else{
		//console.log(canonicalLength);
		canonicalImg.src = "imgs/yes.png";
	}


	//check empty url 
	var emptyUrl = /href="#"/g; 
	var c = a.match(emptyUrl); 
	if(c==null){
		emptyurlImg.src = "imgs/yes.png";

	}
	//console.log(c.length); 	
	else if(c.length>2){
		emptyurlImg.src = "imgs/no.png";
	}else if(c.length==1){
		emptyurlImg.src = "imgs/yes.png";
	}else{
		if(a.indexOf("返回页首") != -1 || a.indexOf("Back to top") != -1 || a.indexOf("返回頁首") != -1){
			emptyurlImg.src = "imgs/yes.png";
		}else{
			emptyurlImg.src = "imgs/no.png";
		}

	}

	//confirm the red cta button
	var oneCta = /class="A-BTNP-RW-ALL"/g;
	var d = a.match(oneCta);
	if(d == null){
		ctaButton.src = "imgs/yes.png";
	}else if(d.length == 1){
		ctaButton.src = "imgs/yes.png";
	}else{
		ctaButton.src = "imgs/no.png";
	}







}
