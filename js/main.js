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
	
    setTimeout(function() {
    	$(".next").trigger('click');
        $("#topButton3").trigger('click');
    },10);

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

    	// update HF button
		if(curNumber == 6 || curNumber == 5)
		{
			$('.Mbutton, .Hbutton').css("display","block");
		}
		else
		{
			$('.Mbutton, .Hbutton').hide();
		}

    	// toggle content
    	$('.pages').removeClass("active");
    	$('#chapter'+curNumber).find("[data-value=page1]").addClass("active");

    	pauseVideo();
    })


	// countPages
	var pageNumber = [];
	for (var i=0; i<9;i++)
	{
		pages = $('#chapter' + i +' > .pages').not('.H, .M, .MH, .qM, .qH, .fM, .fH, .bwH, .bwM, .sM, .sH');
		pageNumber = $.merge(pageNumber,countPages(pages, pages.length, i));
	}

	var vocabularyChapter = 2;
	var quizChapter = 6;
	var finaleChapter = 7;
	var buildwordsChapter = 5;
	var phonicsChapter = 4;
	var structureChapter = 3;
	var finalePage = 2;
	var Mnumber = countPagesMH($('.M.pages').length, vocabularyChapter,'M');
	var MHnumber = countPagesMH($('.MH.pages').length, vocabularyChapter,'MH');
	var Hnumber = countPagesMH($('.H.pages').length, vocabularyChapter,'H');
	var quizM = countPagesMH($('.qM.pages').length, quizChapter,'qM');
	var quizH = countPagesMH($('.qH.pages').length, quizChapter,'qH');
	var bwM = countPagesMH($('.bwM.pages').length, buildwordsChapter,'bwM');
	var bwH = countPagesMH($('.bwH.pages').length, buildwordsChapter,'bwH');
	var finaleM = countPagesMH($('.fM.pages').length, finaleChapter,'fM');
	var finaleH = countPagesMH($('.fH.pages').length, finaleChapter,'fH');
	var sL = countPagesMH($('.sL.pages').length, structureChapter,'sL');
	var sM = countPagesMH($('.sM.pages').length, structureChapter,'sM');
	var sH = countPagesMH($('.sH.pages').length, structureChapter,'sH');
	
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
			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
			if(pageNumber[index] == pageNumber[pageNumber.length-1])
			{
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[4] +'")');
				$('.next, .topButton, .roster').css("visibility", "hidden");
			}
			else if(pageNumber[index] == pageNumber[pageNumber.length-2])
			{
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[5] +'")');
			}
			else
			{
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

			// update quizSelection
			if($('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "quizSelection")
			{
				upadateMHbutton(pageNumber,index, false);
			}
			else if($('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "bwSelection")
			{
				upadateMHbutton(pageNumber,index, false);
			}
			else if(wheel3Flag && pageNumber[index][0] == phonicsChapter && pageNumber[index][1] == 1)
			{
				index = updateIndex(type,pageNumber,index);
				if(type.includes("previous"))
				{
					$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				}
			}
		}

		// toggle content
		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").addClass("active");

		// change button icon
		curButton = "topButton"+pageNumber[index][0];
    	$("#"+preButton).find('img').attr('src',buttonPath);
    	buttonSrc = $("#"+curButton).find('img').attr('src').replace("gray","white");
    	$("#"+curButton).find('img').attr('src',buttonSrc);

    	preNumber = Number(preButton.match(/\d+/)[0]);
    	preButton = $("#"+curButton).attr('id');
    	curNumber = Number(preButton.match(/\d+/)[0]);
    	
    	buttonPath = buttonPath.replace(preNumber,curNumber);

    	pauseVideo();

	})

	var Hflag = false;
	var wheel3Flag = false;
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
			else if(curPage == "quizSelection")
			{
				finaleStart = getIndexOf(pageNumber,[quizChapter+1,Number($('.fM.pages').eq(0).attr('data-value').match(/\d+/)[0])-2]);
				finaleEnd = getIndexOf(pageNumber,[quizChapter+1,Number($('.fH.pages').last().attr('data-value').match(/\d+/)[0])+1]);
				[pageNumber,] = updatePageIndex(pageNumber,finaleStart,finaleEnd,finaleH);

				newNumber = quizH;
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				curChapter = quizChapter;
			}
			else if(curPage == "bwSelection")
			{
				newNumber = bwH;
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				curChapter = buildwordsChapter;
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
			else if (curPage == "quizSelection")
			{
				finaleStart = getIndexOf(pageNumber,[quizChapter+1,Number($('.fM.pages').eq(0).attr('data-value').match(/\d+/)[0])-2]);
				finaleEnd = getIndexOf(pageNumber,[quizChapter+1,Number($('.fH.pages').last().attr('data-value').match(/\d+/)[0])+1]);
				[pageNumber,] = updatePageIndex(pageNumber,finaleStart,finaleEnd,finaleM);

				newNumber = quizM;
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				curChapter = quizChapter;
			}
			else if (curPage == "bwSelection")
			{
				newNumber = bwM;
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				curChapter = buildwordsChapter;
			}
		}
		else if($(this).attr('class').includes('wheelButton'))
		{
			curButton = $(this).attr('id');
			if(curButton == "wheelButtonLow")
			{
				newNumber = sL;
				$("#topButton4").attr("disabled",false);
			}
			else if(curButton == "wheelButtonMid")
			{
				newNumber = sM;
				$("#topButton4").attr("disabled",false);
			}
			else if(curButton == "wheelButtonHigh")
			{
				newNumber = sH;
				finaleStart = getIndexOf(pageNumber,[structureChapter+1,1]);
				finaleEnd = getIndexOf(pageNumber,[structureChapter+2,1]);
				[pageNumber,] = updatePageIndex(pageNumber,finaleStart,finaleEnd,[]);

				$("#topButton4").attr("disabled",true);
				wheel3Flag = true;
			}
			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
			curChapter = structureChapter;
		}

		if($(this).attr('id') != "wheelButtonHigh")
		{
			wheel3Flag = false;
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
		else if(curPage.includes("quizSelection") || curPage.includes("bwSelection") || curPage.includes("wheelButton"))
		{
			upadateMHbutton(pageNumber,indexStart,false);
		}
		


	})

	$('.imageTitle').click(function(e){
		$(this).siblings('.foodText').show();
	})


	$('.foodAnimate').click(function(){
		$('.foodAnimate').removeClass('shakeit');
		$(this).addClass('shakeit');
	})

	// action when click outside target
	$(document).on('click', function(e){
		if(!$(e.target).closest(".shakeit").length)
        	$('.foodAnimate').removeClass('shakeit');
    })

    const correctSound = new Audio("./media/quiz/sound/correct.mp3");
    const incorrectSound = new Audio("./media/quiz/sound/incorrect.mp3");
	$('.alpha').click(function(){
		src = $(this).attr('src');
		ans = $(this).attr('data-answer');
		pauseVideo();

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

	function pauseVideo(){
		correctSound.pause();
		correctSound.src = correctSound.src;
		incorrectSound.pause();
		incorrectSound.src = incorrectSound.src;
	}

	var resetPath = "slot/graybox.png";
	$('.resetButton').click(function(){
		$(this).siblings(".imageTitle").find(".dropBox").attr("alpha-value","empty");
		$(this).siblings(".imageTitle").find(".dragBox").find("img").css("visibility","visible");
		path = $(this).siblings(".imageTitle").find(".dropBox img").attr("src").replace(/answer.*/, resetPath);
		console.log(path);
		$(this).siblings(".imageTitle").find(".dropBox img").attr("src", path);
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

	for(i=0;i<$("#chapter"+ phonicsChapter +" .dragBox").length;i++)
	{
		PhonicspageNumber = Number($("#chapter"+ phonicsChapter +" .dragBox").eq(i).parent().attr("data-value").match(/\d+/)[0]);
		dragulaPhonics[i] = updateDragulaPhonics(phonicsChapter,PhonicspageNumber);
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
	}

	function upadateMHbutton(pageNumber, index, Hflag=false){
		// Hbutton and Mbutton
		$('.Mbutton, .Hbutton').hide();
		if($('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "MHselection"
			|| $('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "quizSelection"
			|| $('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "bwSelection")
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
		sumNumber = $(".pages."+flag).find(".foodNumber").length;
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

	function dragulaBW(dragBoxes, cardFlag=false){
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

	            if(rightAnswer == currentAnswer)
	            {
	                src = source.querySelector('[alpha-value="'+currentAnswer+'"]').src.replace("normal","answer");
	            	target.querySelector(".dropBackground").src = src;
	                // drake.containers = [];

	                if(cardFlag)
	                {
	                	src = source.parentNode.querySelector('.cardDrop > [alpha-value="'+currentAnswer+'"').src.replace("normal","answer");
	                	source.parentNode.querySelector('.cardDrop > [alpha-value="'+currentAnswer+'"').src = src;
	                }
	            }
	            else
	            {
	                source.querySelector('[alpha-value="'+currentAnswer+'"]').style.visibility="visible";
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
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]]);
		right = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(2)")[0],
									$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(3)")[0],
									$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(1)")[0]]);
		return [left,right];
	}

	function updateDragulaQuiz(chapter,page){
		quiz = dragulaBW([$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]]);
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
		spin();
	})


	// var wheelPath = ['./media/Wheel/wheel_pin/low.png',
	// 				'./media/Wheel/wheel_pin/mid.png',
	// 				'./media/Wheel/wheel_pin/high.png'];
	var startAngle = 0;
	var arc = Math.PI / (18 / 2);
	var spinTimeout = null;
	var spinArcStart = 10;
	var spinTime = 0;
	var spinTimeTotal = 0;
	var wheelPath = ['./media/Wheel/wheel_pin/low.png',
					'./media/Wheel/wheel_pin/mid.png',
					'./media/Wheel/wheel_pin/high.png'];
	var wheelctx= [];
	for(i=0; i<$('.pinCanvas').length; i++)
	{
		drawRouletteWheel($('.pinCanvas:eq('+i+')')[0],wheelPath[i]);
	}
	
	function drawRouletteWheel(canvas,path) {
		if (canvas.getContext('2d')) {
			var image = new Image();
    		image.src = path;
		    ctx = canvas.getContext("2d");
		    ctx.clearRect(0, 0, 500, 551);
		    ctx.drawImage(image, 0, 0, 500, 551);    
		}
	}

	function spin() {
	    spinAngleStart = Math.random() * 10 + 10;
	    spinTime = 0;
	    spinTimeTotal = Math.random() * 3 + 4 * 1000;
	    rotateWheel();
	}

	function rotateWheel() {
	    spinTime += 30;
	    if (spinTime >= spinTimeTotal) {
	        stopRotateWheel();
	        return;
	    }
	    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	    startAngle += (spinAngle * Math.PI / 180);
	    drawRouletteWheel();
	    spinTimeout = setTimeout('rotateWheel()', 30);
	}

	function stopRotateWheel() {
	    clearTimeout(spinTimeout);
	    var degrees = startAngle * 180 / Math.PI + 90;
	    var arcd = arc * 180 / Math.PI;
	    var index = Math.floor((360 - degrees % 360) / arcd);
	    ctx.save();
	    ctx.font = 'bold 30px Helvetica, Arial';
	    var text = options[index]
	    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
	    ctx.restore();
	}

	function easeOut(t, b, c, d) {
	    var ts = (t /= d) * t;
	    var tc = ts * t;
	    return b + c * (tc + -3 * ts + 3 * t);
	}

})

