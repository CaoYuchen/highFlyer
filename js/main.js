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
        $("#topButton6").trigger('click');
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
		if(curNumber == 6)
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
	for (var i=0; i<8;i++)
	{
		pageNumber = $.merge(pageNumber,countPages($('#chapter' + i +' > .pages').not('.H, .M, .MH, .qM, .qH').length,i));
	}

	var vocabularyChapter = 2;
	var quizChapter = 6;
	var Mnumber = countPagesMH($('.M.pages').length, vocabularyChapter,'M');
	var MHnumber = countPagesMH($('.MH.pages').length, vocabularyChapter,'MH');
	var Hnumber = countPagesMH($('.H.pages').length, vocabularyChapter,'H');
	var quizM = countPagesMH($('.qM.pages').length, quizChapter,'qM');
	var quizH = countPagesMH($('.qH.pages').length, quizChapter,'qH');
	
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
	var foodFlag = "M";
	var curChapter;
	$('.Hbutton, .Mbutton').click(function(e){
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
				newNumber = quizH;
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				curChapter = quizChapter;
			}
		}
		else
		{
			if (curPage == "MHselection")
			{
				newNumber = Mnumber;
				foodFlag = "M";
				Hflag = false;
			}
			else if (curPage == "quizSelection")
			{
				newNumber = quizM;
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
				curChapter = quizChapter;
			}
		}

		// update page index
		indexStart = getIndexOf(pageNumber,[curChapter,Number($('#'+curPage).attr('data-value').match(/\d+/)[0])]);
		indexEnd = getIndexOf(pageNumber,[curChapter+1,1]);

		start = pageNumber.slice(0,indexStart+1);
		end = pageNumber.slice(indexEnd,pageNumber.length);

		pageNumber=$.merge($.merge(start,newNumber),end);

		indexStart++;

		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[indexStart][0]).find("[data-value=page"+pageNumber[indexStart][1]+"]").addClass("active");

		
		if(curPage.includes("MHselection") || curPage.includes("Hselection"))
		{
			updateFoodNumber(newNumber,foodFlag,pageNumber);
			upadateMHbutton(pageNumber,indexStart,Hflag);
		}
		else if(curPage.includes("quizSelection"))
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

	$('.alpha').click(function(){
		src = $(this).attr('src');
		ans = $(this).attr('data-answer');
		console.log(ans);
		if(ans == "true")
		{
			src=src.replace('normal','correct');
		}
		else
		{
			src=src.replace('normal','incorrect');
		}
		$(this).attr('src',src);
	})


	function countPages (length,n){
		var number = [];
		for(var i = 0; i < length; i++)
		{
			number[i] = [n,i+1];
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
			|| $('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr('id') == "quizSelection")
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


})

