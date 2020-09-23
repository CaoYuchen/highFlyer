$(function() {
	
	var backgrounds = [
						"Stander_page_Cover.png",
						"Stander_page_Hello.png",
						"Greenbg.png",
						"background.jpg",
						"Stander_page_goodbye.png",
						"Stander_page_Feebcack.png"
						];

	// init of cover page
	$('.roster, .previous, .topButton').css('visibility','hidden');
	$('.Hbutton, Mbutton').hide();
	
    // setTimeout(function() {
    // 	$(".next").trigger('click');
    //     $("#topButton3").trigger('click');
    // },10);

	// TopButton
	var preButton = "topButton1";
	var buttonPath = "./media/buttons/Sections/section1_gray.png";
	$('.topButton').click(function(e){
    	e.preventDefault();
    	// change button icon
    	$("#"+preButton).find('img').attr('src',buttonPath);
    	buttonSrc = $(this).find('img').attr('src').replace("gray","white");
    	$(this).find('img').attr('src',buttonSrc);

    	preNumber = Number(preButton.match(/\d+/)[0]);
    	preButton = $(this).attr('id'); 
    	curNumber = Number(preButton.match(/\d+/)[0]);
    	
    	buttonPath = buttonPath.replace(preNumber,curNumber);

    	// change background
    	if(curNumber == 1)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
    	}
    	else
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[2] +'")');
    	}

		if(curNumber>2)
		{
			$('.next, .previous').hide();
		}
		else{
			$('.next, .previous').show();
		}

    	// update HF button
		$('.Mbutton, .Hbutton').hide();

    	// toggle content
    	$('.pages').removeClass("active");
    	$('#chapter'+curNumber).find("[data-value=page1]").addClass("active");

    	pauseVideo();
    	$('.popup').show();
    })


	// countPages
	var pageNumber = [];
	for (var i=0; i<8;i++)
	{
		pages = $('#chapter' + i +' > .pages').not('.H, .M, .MH, .qM, .qH, .fM, .fH, .bwH, .bwM, .sM, .sH');
		pageNumber = $.merge($.merge([],pageNumber),countPages(pages, pages.length, i));
	}

	var vocabularyChapter = 2;
	var quizChapter = 5;
	var finaleChapter = 6;
	var buildwordsChapter = 4;
	// var phonicsChapter = 4;
	var structureChapter = 3;
	var finalePage = 2;
	var Mnumber = countPagesMH($('.M.pages').length, vocabularyChapter,'M');
	var MHnumber = countPagesMH($('.MH.pages').length, vocabularyChapter,'MH');
	var Hnumber = countPagesMH($('.H.pages').length, vocabularyChapter,'H');
	var quizL = countPagesMH($('.qL.pages').length, quizChapter,'qL');
	var quizM = countPagesMH($('.qM.pages').length, quizChapter,'qM');
	var quizH = countPagesMH($('.qH.pages').length, quizChapter,'qH');
	var bwL = countPagesMH($('.bwL.pages').length, buildwordsChapter,'bwL');
	var bwM = countPagesMH($('.bwM.pages').length, buildwordsChapter,'bwM');
	var bwH = countPagesMH($('.bwH.pages').length, buildwordsChapter,'bwH');
	var finaleL = countPagesMH($('.fL.pages').length, finaleChapter,'fL');
	var finaleM = countPagesMH($('.fM.pages').length, finaleChapter,'fM');
	var finaleH = countPagesMH($('.fH.pages').length, finaleChapter,'fH');
	var sL = countPagesMH($('.sL.pages').length, structureChapter,'sL');
	var sM = countPagesMH($('.sM.pages').length, structureChapter,'sM');
	var sH = countPagesMH($('.sH.pages').length, structureChapter,'sH');
	var phonics = countPagesMH($('.phonics.pages').length, buildwordsChapter,'phonics');
	
	// SideButton
	var number = pageNumber.length;
	$('.next, .previous').click(function(e){
		type = $(this).attr("class");
		p1 = Number($(".active.pages").parent().attr("id").match(/\d+/)[0]);
		p2 = Number($(".active").attr("data-value").match(/\d+/)[0]);
		position = [p1,p2];
		index = getIndexOf(pageNumber,position);

		// update index
		index = updateIndex(type,pageNumber,index);

		// change background
		$('.next, .topButton, .roster, .previous').css("visibility", "visible");
		$('.Hbutton, .Mbutton').hide();
		if(pageNumber[index][1]>1)
		{
			if(pageNumber[index] == pageNumber[pageNumber.length-1])
			{
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[4] +'")');
				$('.next, .topButton, .roster').css("visibility", "hidden");
			}
			else
			{
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				upadateMHbutton(pageNumber,index, Hflag);
			}
		}
		else if(index == 1)
		{
			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
		}
		else if(index == 0)
		{
			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[0] +'")');
			$('.previous, .topButton, .roster').css("visibility", "hidden");
		}
		else
		{
			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[2] +'")');
			if(pageNumber[index] == pageNumber[pageNumber.length-2])
			{
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[5] +'")');
			}

			if(pageNumber[index][0]>2 && pageNumber[index][1] == 1)
			{
				$('.next, .previous').hide();
			}
			else{
				$('.next, .previous').show();
			}
		}

		// toggle content
		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").addClass("active");

		// change button icon
		curButton = "topButton"+pageNumber[index][0];		
    	if(!curButton.includes(0) && !curButton.includes(8))
    	{
    		$("#"+preButton).find('img').attr('src',buttonPath);
    		buttonSrc = $("#"+curButton).find('img').attr('src').replace("gray","white");
    		$("#"+curButton).find('img').attr('src',buttonSrc);

    		preNumber = Number(preButton.match(/\d+/)[0]);
	    	preButton = $("#"+curButton).attr('id');
	    	curNumber = Number(preButton.match(/\d+/)[0]);
	    	
	    	buttonPath = buttonPath.replace(preNumber,curNumber);
    	}

    	pauseVideo();
    	$('.popup').show();

	})

	var Hflag = false;
	var foodFlag = "M";
	var curChapter;
	$('.Hbutton, .Mbutton, .wheelButton').click(function(e){
		curPage = $('.active.pages').attr('id');
		curChapter = vocabularyChapter;
		if($(this).attr('class').includes('Hbutton'))
		{
			if (curPage == "Hselection")
			{
				newNumber = MHnumber;
				foodFlag = "MH";
				Hflag = true;
			}
			else if(curPage == "MHselection")
			{
				newNumber = Hnumber;
				foodFlag = "H";
				Hflag = true;
			}
		}
		else if($(this).attr('class').includes('Mbutton'))
		{
			if (curPage == "MHselection")
			{
				newNumber = Mnumber;
				foodFlag = "M";
				Hflag = false;
			}
		}
		else if($(this).attr('class').includes('wheelButton'))
		{
			curButton = $(this).attr('class');
			if(curPage == "structureSelection")
			{
				if(curButton.includes("wheelButtonLow"))
				{
					newNumber = sL;
					spinPiece = 6;
					nowPiece = lPiece.slice();
				}
				else if(curButton.includes("wheelButtonMid"))
				{
					newNumber = sM;
					spinPiece = 9;
					nowPiece = mPiece.slice();
				}
				else if(curButton.includes("wheelButtonHigh"))
				{
					newNumber = sH;
					spinPiece = 12;
					nowPiece = hPiece.slice();
				}
				curChapter = structureChapter;
			}
			else if(curPage == "bwSelection")
			{
				if(curButton.includes("wheelButtonLow"))
				{
					newNumber = $.merge($.merge([],phonics),bwL);
				}
				else if(curButton.includes("wheelButtonMid"))
				{
					newNumber = $.merge($.merge([],phonics),bwM);
				}
				else if(curButton.includes("wheelButtonHigh"))
				{
					newNumber = bwH;
				}
				curChapter = buildwordsChapter;
				// console.log(phonics,bwL);
			}
			else if(curPage == "quizSelection")
			{
				if(curButton.includes("wheelButtonLow"))
				{
					newNumber = quizL;
				}
				else if(curButton.includes("wheelButtonMid"))
				{
					newNumber = quizM;
				}
				else if(curButton.includes("wheelButtonHigh"))
				{
					newNumber = quizH;
				}
				curChapter = quizChapter;
			}
			else if(curPage == "finaleSelection")
			{
				if(curButton.includes("wheelButtonLow"))
				{
					newNumber = finaleL;
				}
				else if(curButton.includes("wheelButtonMid"))
				{
					newNumber = finaleM;
				}
				else if(curButton.includes("wheelButtonHigh"))
				{
					newNumber = finaleH;
				}
				curChapter = finaleChapter;
			}

			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
			$('.popup').show();
			
		}

		// update page index
		indexStart = getIndexOf(pageNumber,[curChapter,Number($('#'+curPage).attr('data-value').match(/\d+/)[0])]);
		indexEnd = getIndexOf(pageNumber,[curChapter+1,1]);
		[pageNumber,indexStart] = updatePageIndex(pageNumber,indexStart,indexEnd,newNumber);


		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[indexStart][0]).find("[data-value=page"+pageNumber[indexStart][1]+"]").addClass("active");
		
		if(curPage.includes("MHselection") || curPage.includes("Hselection"))
		{
			updateFoodNumber(newNumber,foodFlag,pageNumber);
			upadateMHbutton(pageNumber,indexStart,Hflag);
		}

		$('.next, .previous').show();
	})

	//roster 
	$(".roster").click(function() {
		$('#rosterPopup').modal('show');
	})

	$('.imageTitle').click(function(e){
		$(this).siblings('.foodText').show();
	})


	$('.foodAnimate').click(function(){
		$('.foodAnimate').removeClass('shakeit');
		$(this).addClass('shakeit');
	})

	$('.popup').click(function(){
		$(this).hide();
	})

	// action when click outside target
	$(document).on('click', function(e){
		if(!$(e.target).closest(".shakeit").length)
        	$('.foodAnimate').removeClass('shakeit');
    })

    var correctSound = new Audio("./media/sound/correct.mp3");
    var incorrectSound = new Audio("./media/sound/incorrect.mp3");
    var wheelSound = new Audio("./media/sound/wheel.mp3");
	$('.alpha').click(function(){
		src = $(this).attr('src');
		ans = $(this).attr('data-answer');
		pauseAudio();
		if(ans == "true" && src.includes('normal'))
		{
			src=src.replace('normal','correct');
			correctSound.play();
		}
		else if(ans == "false" && src.includes('normal'))
		{
			src=src.replace('normal','incorrect');
			incorrectSound.play();
		}
		$(this).attr('src',src);
	})

	function pauseAudio(){
		correctSound.pause();
		correctSound.currentTime = 0;
		incorrectSound.pause();
		incorrectSound.currentTime = 0;
		wheelSound.pause();
		wheelSound.currentTime = 0;
	}

	var resetFood = "slot/graybox.png";
	var resetCard = "slot/transbox.png";
	var resetBW = ["slot/bluebox.png","slot/orangebox.png"];
	$('.resetButton').click(function(){
		curClass = $(this).attr("class");
		if(curClass.includes("Bfood"))
		{
			$(this).siblings(".imageTitle, .structureDown").find(".dropBox").attr("alpha-value","empty");
			$(this).siblings(".imageTitle").find(".dragBox").find("img").css("visibility","visible");
			path = $(this).siblings(".imageTitle, .structureDown").find(".dropBox img").attr("src").replace(/answer.*/, resetFood);
			$(this).siblings(".imageTitle, .structureDown").find(".dropBox img").attr("src", path);
		}
		else if(curClass.includes("Bbw"))
		{
			path = $(this).siblings(".buildWordsTitle").find(".dropBox").eq(0).find("img").attr("src").replace(/answer.*/,resetBW[0]);
			$(this).siblings(".buildWordsTitle").find(".dropBox").eq(0).find("img").attr("src",path);
			path = $(this).siblings(".buildWordsTitle").find(".dropBox").eq(2).find("img").attr("src").replace(/answer.*/,resetBW[0]);
			$(this).siblings(".buildWordsTitle").find(".dropBox").eq(2).find("img").attr("src",path);
			path = $(this).siblings(".buildWordsTitle").find(".dropBox").eq(1).find("img").attr("src").replace(/answer.*/,resetBW[1]);
			$(this).siblings(".buildWordsTitle").find(".dropBox").eq(1).find("img").attr("src",path);
			path = $(this).siblings(".buildWordsTitle").find(".dropBox").eq(3).find("img").attr("src").replace(/answer.*/,resetBW[1]);
			$(this).siblings(".buildWordsTitle").find(".dropBox").eq(3).find("img").attr("src",path);

			$(this).siblings(".buildWordsTitle").find(".dragBox img").css("visibility","visible");

			$(this).siblings(".buildWordsTitle").find(".bwCorrect").hide();
			$(this).siblings(".buildWordsTitle").find(".bwCorrect").removeClass("animated bounceInDown fast");
		}
		else if(curClass.includes("Bquiz"))
		{
			for(i=0;i<$(this).siblings(".quizImage, .alphaBox").find("[data-answer='false']").length;i++)
			{
				path = $(this).siblings(".quizImage, .alphaBox").find("[data-answer='false']").eq(i).attr("src").replace("incorrect","normal");
				$(this).siblings(".quizImage, .alphaBox").find("[data-answer='false']").eq(i).attr("src",path);
			}
			path = $(this).siblings(".quizImage, .alphaBox").find("[data-answer='true']").attr("src").replace("correct","normal");
			$(this).siblings(".quizImage, .alphaBox").find("[data-answer='true']").attr("src",path);
		}
		else if(curClass.includes("Bvoc"))
		{
			$(this).siblings(".foodText").hide();
		}
		else if(curClass.includes("Bcard"))
		{
			path = $(this).siblings(".imageTitle").find(".dropBox img").attr("src").replace(/answer.*/,resetCard);
			$(this).siblings(".imageTitle").find(".dropBox img").attr("src",path);
			for(i=0;i<$(this).siblings(".cardDrop").find("img").length;i++)
			{
				path = $(this).siblings(".cardDrop").find("img").eq(i).attr("src").replace("answer","normal");
				$(this).siblings(".cardDrop").find("img").eq(i).attr("src",path);
			}			
			$(this).siblings(".dragBox").find("img").css("visibility","visible");
		}
		else if(curClass.includes("Bqc"))
		{
			path = $(this).siblings(".quizImage").find(".dropBox img").attr("src").replace(/answer.*/, resetFood);
			$(this).siblings(".quizImage").find(".dropBox img").attr("src", path);
			$(this).siblings(".dragBox").find("img").css("visibility","visible");

			$(this).siblings(".quizCorrect").hide();
			$(this).siblings(".quizCorrect").removeClass("animated bounceInDown fast");
		}
	})


	// drag function
	var dragulaBWleft = [],
	dragulaBWright =[],
	dragulaQuiz=[],
	dragulaPhonics=[],
	dragulaStructure=[];

	for(i=0;i<$(".buildWordsTitle").length;i++)
	{
		BWpageNumber = Number($(".buildWordsTitle").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		[dragulaBWleft[i],dragulaBWright[i]] = updateDragulaBW(buildwordsChapter,BWpageNumber);
	}

	for(i=0;i<$(".quizImage.dragBox").length;i++)
	{
		QuizpageNumber = Number($(".quizImage.dragBox").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		dragulaQuiz[i] = updateDragulaQuiz(quizChapter,QuizpageNumber);	
	}

	for(i=0;i<$("#chapter"+ buildwordsChapter +" .phonics .dragBox").length;i++)
	{
		PhonicspageNumber = Number($("#chapter"+ buildwordsChapter +" .phonics .dragBox").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		dragulaPhonics[i] = updateDragulaPhonics(buildwordsChapter,PhonicspageNumber);
	}
	// strcuture
	for(i=0;i<$("#chapter"+ structureChapter +" .imageTitle.dragBox").length;i++)
	{
		StructurepageNumber = Number($("#chapter"+ structureChapter +" .imageTitle.dragBox").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		dragulaStructure[i] = updateDragulaStructure(structureChapter,StructurepageNumber);
	}
	for(i=0;i<$("#chapter"+ structureChapter +" .sFood").length;i++)
	{
		StructurepageNumber = Number($("#chapter"+ structureChapter +" .sFood").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		dragulaStructure[i] = updateDragulaFood(structureChapter,StructurepageNumber);
	}
	for(i=0;i<$("#chapter"+ structureChapter +" .sFoodPrice").length;i++)
	{
		StructurepageNumber = Number($("#chapter"+ structureChapter +" .sFoodPrice").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		dragulaStructure = updateDragulaFoodPrice(structureChapter,StructurepageNumber);
	}


	function countPages (pages,length,n){
		var number = [];
		for(var i = 0; i < length; i++)
		{
			k = Number(pages.eq(i).attr('data-value').match(/\d+/)[0]);
			number[i] = [n,k];
		}
		return number;
	}

	function countPagesMH (length,n,name){
		var number = [];
		for(var i = 0; i < length; i++)
		{
			k = Number($('[data-'+name+'=page'+(i+1)+']').attr('data-value').match(/\d+/)[0]);
			number[i] = [n,k];
		}
		return number;
	}

	function getIndexOf(array, item) {
	    for (var i = 0; i < array.length; i++) {
	        // This if statement depends on the format of your array
	        if (array[i][0] == item[0] && array[i][1] == item[1]) {
	            return i;   // Found it
	        }
	    }
	    return false;   // Not found
	}

	function updateIndex(type,pageNumber,index)
	{
		if(type.includes("next"))
		{
			index ++;
		}
		else if(type.includes("previous"))
		{
			index --;
		}
		if(index < 0)
		{
			index = 0;
		}
		if(index > pageNumber.length-1)
		{
			index = pageNumber.length-1;
		}

		return index;
	}

	function pauseVideo(){
		var media = $("#hfVideo").get(0);
		media.pause();
		media.currentTime = 0;
		var media = $("#hfVideo2").get(0);
		media.pause();
		media.currentTime = 0;
		// var media = $("#pizzaSong").get(0);
		// media.pause();
		// media.currentTime = 0;
	}

	function upadateMHbutton(pageNumber, index, Hflag=false){
		// Hbutton and Mbutton
		$('.Mbutton, .Hbutton').hide();
		// if($('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "MHselection"
		// 	|| $('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "quizSelection"
		// 	|| $('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "bwSelection")
		if($('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "MHselection")
		{
			$('.Mbutton, .Hbutton').css("display","block");
		}
		else if($('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "Hselection" && !Hflag)
		{

			$('.Hbutton').css("display","block");
		}
	}

	function updateFoodNumber(newNumber,flag,pageNumber){
		//update food number
		sumNumber = $(".pages."+flag).find(".foodNumber").length / 2;
		$(".pages."+flag).find(".backNumber").text(sumNumber);
		for(var i=0; i<newNumber.length; i++)
		{
			foodIndex = getIndexOf(pageNumber,newNumber[i]);
			foodNumber = $('#chapter'+pageNumber[foodIndex][0]).find("[data-value=page"+pageNumber[foodIndex][1]+"]").attr("data-"+flag);
			foodNumber = Number(foodNumber.match(/\d+/)[0]);
			$('#chapter'+pageNumber[foodIndex][0]).find("[data-value=page"+pageNumber[foodIndex][1]+"]").find(".frontNumber").text(foodNumber);
		}

	}

	function updatePageIndex(pageNumber, indexStart, indexEnd, newNumber) {
		// update page index
		start = pageNumber.slice(0,indexStart+1);
		end = pageNumber.slice(indexEnd,pageNumber.length);

		pageNumber=$.merge($.merge(start,newNumber),end);

		indexStart ++;

		return [pageNumber,indexStart];
	}

	function dragulaBW(dragBoxes, cardFlag=false, bwFlag=false, quizFlag=false){
		drake = dragula(
			dragBoxes,
	    {
			copy: function (el, source) {
			return source.classList.contains('dragBox');
			},
			isContainer: function (el) {
			return false;
			},
			direction: 'horizontal',
			removeOnSpill: true,
			accepts: function (el, target) {
			return true;
			},
			moves: function (el, source, handle) {
			return source.classList.contains('dragBox'); 
			}
	    }).on('drag',function(el, source) {
	    	// drag function is stupid
	    }).on('drop',function(el,target,source,sibling){
	        if(target.classList.contains('dropBox'))
	        {
	            var rightAnswer=target.getAttribute("alpha-value"), 
	                currentAnswer=el.getAttribute("alpha-value");

	            pauseAudio();

	            if(rightAnswer == currentAnswer)
	            {
	                src = source.querySelector('[alpha-value="'+currentAnswer+'"]').src.replace("normal","answer");
	            	target.querySelector(".dropBackground").src = src;
	            	correctSound.play();

	                if(cardFlag)
	                {
	                	src = source.parentNode.querySelector('.cardDrop > [alpha-value="'+currentAnswer+'"').src.replace("normal","answer");
	                	source.parentNode.querySelector('.cardDrop > [alpha-value="'+currentAnswer+'"').src = src;
	                }

	                if(bwFlag)
	                {
	                	if(target.parentNode.querySelector('.dropBox:nth-of-type(1) > .dropBackground').src.includes('answer') && target.parentNode.querySelector('.dropBox:nth-of-type(2) > .dropBackground').src.includes('answer'))
	                	{
	                		target.parentNode.parentNode.querySelector('.bwCorrect').style.display="block";
	                		target.parentNode.parentNode.querySelector('.bwCorrect').classList.add('animated', 'bounceInDown', 'fast');
	                	}
	                }
	                if(quizFlag)
	                {
	                	if(target.parentNode.querySelector('.dropBox > .dropBackground').src.includes('answer'))
	                	{
	                		console.log("1");
	                		target.parentNode.parentNode.querySelector('.quizCorrect').style.display="block";
	                		target.parentNode.parentNode.querySelector('.quizCorrect').classList.add('animated', 'bounceInDown', 'fast');
	                	}
	                }
	            }
	            else
	            {
	                source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="visible";
	                incorrectSound.play();
	            }       
	        }

	        el.remove();

	    }).on('cancel',function(el, container, source) {
	    	// show the source imagex
	    	var currentAnswer=el.getAttribute("alpha-value");
	    	source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="visible";
	    }).on('over',function(el, container, source) {
	    	// hover change dropBox outlook
	        updateDropBoxOutlook();

	        if(container.classList.contains("dropBox"))
	        {
	            src = container.querySelector(".dropBackground").src.replace("box","");
	            container.querySelector(".dropBackground").src = src;
	            container.classList.add('hover');
	        }

	        // hover change dragging item outlook
	        // $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
	        src = $(".gu-mirror").attr("src").replace("normal","active");
	        $(".gu-mirror").attr("src",src);

	        // hide the source image
	    	var currentAnswer=el.getAttribute("alpha-value");
	    	source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="hidden";
	    	// hide target gray image
	    	el.style.display="none";
	    }).on('out',function(el, container, source){
	        // after drop, change dropBox outlook
	        updateDropBoxOutlook();
	    })
	    return drake;
	}


	function dragulaFood(dragBoxes){
		drake = dragula(
			dragBoxes,
	    {
			copy: function (el, source) {
			return source.classList.contains('dragBox');
			},
			isContainer: function (el) {
			return false;
			},
			direction: 'horizontal',
			removeOnSpill: true,
			accepts: function (el, target) {
			return true;
			},
			moves: function (el, source, handle) {
			return source.classList.contains('dragBox'); 
			}
	    }).on('drag',function(el, source) {
	    	// drag function is stupid
	    }).on('drop',function(el,target,source,sibling){
	        if(target.classList.contains('dropBox'))
	        {
	            var emptyStatus=target.getAttribute("alpha-value");
	            var currentAnswer=el.getAttribute("alpha-value");

	            if(emptyStatus == "empty")
	            {
	                src = source.querySelector('[alpha-value="'+currentAnswer+'"]').src.replace("normal","answer");
	            	target.querySelector(".dropBackground").src = src;
	            	target.setAttribute('alpha-value','occupied');
	                // drake.containers = [];
	            }
	            else
	            {
	                source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="visible";
	            }       
	        }

	        el.remove();

	    }).on('cancel',function(el, container, source) {
	    	// show the source image
	    	var currentAnswer=el.getAttribute("alpha-value");
	    	source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="visible";
	    }).on('over',function(el, container, source) {
	    	// hover change dropBox outlook
	        updateDropBoxOutlook();

	        if(container.classList.contains("dropBox"))
	        {
	            src = container.querySelector(".dropBackground").src.replace("box","");
	            container.querySelector(".dropBackground").src = src;
	            container.classList.add('hover');
	        }

	        // hover change dragging item outlook
	        // $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
	        src = $(".gu-mirror").attr("src").replace("normal","active");
	        $(".gu-mirror").attr("src",src);

	        // hide the source image
	    	var currentAnswer=el.getAttribute("alpha-value");
	    	source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="hidden";
	    	// hide target gray image
	    	el.style.display="none";
	    }).on('out',function(el, container, source){
	        // after drop, change dropBox outlook
	        updateDropBoxOutlook();
	    })
	    return drake;
	}

	function updateDropBoxOutlook(){
		if($(".dropBox.hover")[0])
        {
        	src = $(".dropBox.hover").find('.dropBackground').attr("src");
        	if(!src.includes("box") && src.includes("slot"))
        	{
	        	src = src.replace(".png","box.png");
	            $(".dropBox.hover").find('.dropBackground').attr('src',src);  
        	}
        }
        $(".dropBox.hover").removeClass('hover');
	}

	function updateDragulaBW(chapter,page){
		left = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]],undefined,1);
		right = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(2)")[0],
									$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(3)")[0],
									$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(1)")[0]],undefined,1);
		return [left,right];
	}

	function updateDragulaQuiz(chapter,page){
		quiz = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]],undefined,undefined,1);
		return quiz;
	}

	function updateDragulaPhonics(chapter,page){
		cardFlag = 1;
		quiz = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(2)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(3)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(4)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(5)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]],cardFlag);
		return quiz;
	}

	function updateDragulaStructure(chapter,page){
		cardFlag = 1;
		quiz = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(2)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(3)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]],cardFlag);
		return quiz;
	}
	function updateDragulaFood(chapter,page){
		quiz = dragulaFood([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]]);
		return quiz;
	}
	function updateDragulaFoodPrice(chapter,page){
		quiz = dragulaFood([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(1)")[0]]);
		return quiz;
	}



	// wheel
	$('.wheel').click(function(){
		image = $(this).find(".pin > img")[0];
		canvas = $(this).find(".pinCanvas")[0];
		spin(canvas,image);
		pauseAudio();
		wheelSound.play();
	})

	var startAngle = 0;
	var spinPiece = 6;
	var spinTimeout = null;
	var spinTime = 0;
	var spinTimeTotal = 0;
	var spinAngleStart = 0;
	var canvas, image;
	var previousPiece = 1;
	// var arc = Math.PI / (spinPiece / 2);

	var lPiece = [1,2,3,4,5,6];
	var mPiece = [1,2,3,4,5,6,7,8,9];
	var hPiece = [1,2,3,4,5,6,7,8,9,10,11,12];
	var nowPiece = lPiece;

	var arc_last = 0;

	for(i=0; i<$('.pinCanvas').length; i++)
	{
		image = $('.wheel').eq(i).find(".pin > img")[0];
		canvas = $('.wheel').eq(i).find(".pinCanvas")[0];
		var ctx = canvas.getContext("2d");
		drawRouletteWheel(canvas, image);
	}
	
	function drawRouletteWheel(canvas,image) {
	    if (canvas.getContext) {
	        var ctx = canvas.getContext("2d");
	        image.onload=function(){
	        	ctx.clearRect(0, 0, canvas.width, canvas.height);
	        	ctx.drawImage(image, 0, 0);
	        	ctx.save();
	        } 
	    }
	}

	// function spin(canvas, image) {
	//     do
	//     {
	//     	spinAngleStart = Math.random() * 10 + 10;
	//     	spinTimeTotal = Math.random() * 3 + 5 * 1010; //5.05s duration

	//     	for(spinTime=0;spinTime<spinTimeTotal;spinTime+=30)
	//     	{
	//     		spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	//     		startAngle += (spinAngle * Math.PI / 180);
	//     		angle = startAngle + arc;
	//     	}
	//     	restPiece = (angle%(Math.PI * 2)) / (Math.PI * 2) * spinPiece;
	//     	diff = Math.abs(previousPiece - restPiece - Math.PI/(spinPiece*2));

	//     } while(diff <= 0.5);

	//     spinTime = 0;
	//     startAngle = 0;
	//     previousPiece = Math.round(restPiece);

	//     rotateWheel(canvas, image);
	// }

	// function rotateWheel(canvas, image) {
	//     spinTime += 30;
	//     if (spinTime >= spinTimeTotal) {
	//         stopRotateWheel();
	//         return;
	//     }
	//     var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	//     startAngle += (spinAngle * Math.PI / 180);

	// 	var ctx = canvas.getContext("2d");
	//     ctx.clearRect(0, 0, canvas.width, canvas.height);
	//     ctx.save();
	//     ctx.translate(canvas.width / 2, canvas.height / 2);

	//     var angle = startAngle + arc;
	//     ctx.rotate(angle);
	//     ctx.drawImage(image, -canvas.width / 2, -canvas.width / 2);
	//     ctx.restore();

	//     spinTimeout = setTimeout(function()
	//     	{
	//     		rotateWheel(canvas,image);
	//     	}, 30);
	// }

	function spin(canvas, image) {
		
		$(".wheel").css("pointer-events", "none");

		if(nowPiece.length <= 0)
		{
			if(spinPiece == 6)
			{
				nowPiece = lPiece.slice();
			}
			else if(spinPiece == 9)
			{
				nowPiece = mPiece.slice();
			}
			else if(spinPiece == 12)
			{
				nowPiece = hPiece.slice();
			}
		}

		shuffleArray(nowPiece);
		arc = 360 / spinPiece * 12;
		arc_diff = nowPiece[0] * arc - arc_last;
		if(arc_diff < 0)
		{
			arc_diff = arc_diff + 4320;
		}

		spinAngleStart = 10;
    	// spinTimeTotal = 4380 + 240 * 12; //5.05s duration
    	spinTimeTotal = 4380 + arc_diff;

	    spinTime = 0;

	    rotateWheel(canvas, image);

	    arc_last = nowPiece[0] * arc;
		nowPiece.splice(nowPiece.indexOf(nowPiece[0]), 1);
	}

	function rotateWheel(canvas, image) {
	    spinTime += 30;
	    if (spinTime >= spinTimeTotal) {
	        stopRotateWheel();
	        $(".wheel").css("pointer-events", "auto");
	        return;
	    }
	    // console.log(spinTime)
	    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	    startAngle += (spinAngle * Math.PI / 180.0);

		var ctx = canvas.getContext("2d");
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.save();
	    ctx.translate(canvas.width / 2, canvas.height / 2);

	    var angle = startAngle;
	    ctx.rotate(angle);
	    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
	    ctx.restore();

	    spinTimeout = setTimeout(function()
	    	{
	    		rotateWheel(canvas,image);
	    	}, 30);
	}

	function stopRotateWheel() {
	    clearTimeout(spinTimeout);
	}

	function easeOut(t, b, c, d) {
	    var ts = (t /= d) * t;
	    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
	}

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	}

})
