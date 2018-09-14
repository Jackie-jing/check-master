

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
	var showT = a.slice(title+7,lastTitle); 
	var titleLength = a.slice(title+7,lastTitle);	

	if(titleLength.length == 0 || title == -1){
		titleImg.src = "imgs/no.png";
	}else{
		titleImg.src = "imgs/yes.png";
	}
	document.getElementById("showTitle").innerHTML = "Title:" + showT;


	//get the discription 
	var disStr='name="description" content="'; 
	var discription = a.indexOf(disStr); //-1
	//console.log(discription);
	var lastDis = a.indexOf('"/>',discription); //-1
	//console.log(lastDis);
	var showDis = a.slice(discription + disStr.length, lastDis); 
	var discriptionLength = a.slice(discription + disStr.length, lastDis);

	if(discriptionLength.length == 0 || discription == -1){
		discritionImg.src = "imgs/no.png";
	}else{
		//console.log(discriptionLength);
		discritionImg.src = "imgs/yes.png";
	}

	document.getElementById("showDis").innerHTML = "Discription:" + showDis;


	//get canonical 
	var canonicalStr = 'rel="canonical" href='; 
	var canonical = a.indexOf(canonicalStr); 
	var lastCan = a.indexOf('/>',canonical); 
	var showCan = a.slice(canonical + canonicalStr.length, lastCan); 
	var canonicalLength = a.slice(canonical + canonicalStr.length, lastCan);
	if(canonicalLength.length == 0 || canonical == -1){
		canonicalImg.src = "imgs/no.png";
	}else{
		//console.log(canonicalLength);
		canonicalImg.src = "imgs/yes.png";
	}

	document.getElementById("showCan").innerHTML = "Canonical:" + showCan;


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

	//get heading
	//var nodeHeading =indexOf("h3");
	//自定义函数 ，输入要搜索标签 ，返回 其中字符串
	// function checkHead(Headname){
	// var nodeHeading = [],headlocal = 0,searchLocal = 0,wantHeadStr=[],searchTxt = a;
	// do{
	// 	if(searchTxt.indexOf(Headname,searchLocal)!== -1)
	// 	{
	// 		headlocal = searchTxt.indexOf(Headname,searchLocal);
	// 		searchLocal = headlocal + 2;
	// 		nodeHeading.push(headlocal);
	// 	}
	// 	else 
	// 		break;
	// }while(true)
	// //console.log(nodeHeading);
	// for(var i = 0,headstr='';i < nodeHeading.length;i+=2){
	// 	headstr = searchTxt.slice(nodeHeading[i],nodeHeading[i+1]);
	// 	strStart = headstr.indexOf(">");
	// 	strEnd = headstr.lastIndexOf("<");
	// 	 wantHeadStr.push(headstr.slice(strStart+1,strEnd));
	// }
	// 	return wantHeadStr;
	// }
	// 合并去重 

	//

	//处理字符串a,截取其中主体内容section,查询到中间的唯一标示，开通为 “主要内容顶部”或“Top of main content”，
	//截取后进行判断
	 if(a.indexOf("Top of main content")!== -1)
	 	var checkSectionStart = a.indexOf("Top of main content")
	 else 
	 	var checkSectionStart = a.indexOf("主要内容顶部")
	 	var checkSectionEnd = a.indexOf('class="footer"')
	 	var searchTxt=a.slice(checkSectionStart,checkSectionEnd);
		function checkHead1(Headname){
	var nodeHeading = [],headlocal = 0,searchLocal = 0,wantHeadStr=[];
	
	//重复查找所有符合参数Headname条件的字符位置，将其全部放回数组nodeHeading
	do{
		if(searchTxt.indexOf(Headname,searchLocal)!== -1)//如果此时查找到符合条件的字符串，将其放入数组，否则break跳出
		{
			headlocal = searchTxt.indexOf(Headname,searchLocal);
			searchLocal = headlocal + 2;
			nodeHeading.push(headlocal);
		}
		else 
			break;
	}while(true)
		return nodeHeading;
	}
	//执行checkHead 函数，并将所有位置放到一个数组内
		var myh1 = 	checkHead1("h1"),myallH=[],nodeHeading,wantHeadStr=[],
		myh2 = checkHead1("h2"),
		myh3 = checkHead1("h3"),
		myh4 = checkHead1("h4"),
		myh5 = checkHead1("h5"),
		myh6 = checkHead1("h6");
		myallH = myallH.concat(myh1,myh2,myh3,myh4,myh5,myh6);
		nodeHeading = myallH;
		//将所有数组依次进行排序
		nodeHeading.sort((a,b)=>a-b);
	//console.log(nodeHeading);
	//重复按对取出所有数组位置，进行截取字符串
	for(var i = 0,headstr='',regx=/<\/?.+?\/?>/g;i < nodeHeading.length;i+=2){
		headstr = searchTxt.slice(nodeHeading[i],nodeHeading[i+1]);
		strStart = headstr.indexOf(">");
		strEnd = headstr.lastIndexOf("<");
		 wantHeadStr.push(
		 	{
		 		classH:headstr.slice(0,2),
		 		contentH:(headstr.slice(strStart+1,strEnd)).replace(regx,""),
		 		left:75*parseInt(headstr.slice(1,2))
		 	}
		 	);
	}
		console.log(wantHeadStr);
		var html;
		for (var i = 0 ;i<wantHeadStr.length;i++) {
			html +=`<${wantHeadStr[i].classH} style="margin-left:${wantHeadStr[i].left}px;">${wantHeadStr[i].classH}:${wantHeadStr[i].contentH}</${wantHeadStr[i].contentH}>`
		}
		document.getElementById("showH").innerHTML = html;

		//查找utage_data
		var pageObjStart = a.indexOf("var utag_data");
		var pageObjEnd =  a.indexOf("</",pageObjStart);
		var pageObj = a.slice(pageObjStart,pageObjEnd);
		console.log(pageObj);
		eval(pageObj);
		//console.log(utag_data);
		html ='';
		for(var p in utag_data){
			html+='<h4>'+p+':  '+utag_data[p]+'</h4>';
		}
		document.getElementById("page-category").innerHTML = html;

}
