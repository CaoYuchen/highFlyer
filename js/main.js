$(function() {
	
	var backgrounds = [
						"Stander_page_Cover.png",
						"Stander_page_Hello.png",
						"Greenbg.png",
						"background.jpg",
						"Stander_page_goodbye.png",
						"Stander_page_Feebcack.png"
						]

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

    	// toggle content
    	$('.pages').removeClass("active");
    	$('#chapter'+curNumber).find("[data-value=page1]").addClass("active");

    	pauseVideo();
    })


	// countPages
	var pageNumber = [];
	for (var i=0; i<8;i++)
	{
		pageNumber = $.merge(pageNumber,countPages($('#chapter' + i +' > .pages').length,i));
	}
	var vocabularyChapter = 2;
	var Mnumber = countPages($('.M.pages').length, vocabularyChapter);
	var MHnumber = countPages($('.MH.pages').length, vocabularyChapter);
	var Hnumber = countPages($('.H.pages').length, vocabularyChapter);
	var Mindex = 1,
		MHindex = 1,
		Hindex = 1;
	
	// SideButton
	var number = pageNumber.length;
	$('.next, .previous').click(function(e){
		type = $(this).attr("class");
		p1 = Number($(".active.pages").parent().attr("id").match(/\d+/)[0]);
		p2 = Number($(".active").attr("data-value").match(/\d+/)[0]);
		position = [p1,p2];
		index = getIndexOf(pageNumber,position);

		console.log(type)

		// update index
		if(index == 2)
		{
			if(type.includes("M"))
			{
				Mindex = updateIndex(type,Mnumber,Mindex);
			}
			else if(type.includes("MH"))
			{
				MHindex = updateIndex(type,MHnumber,MHindex);
			}
			else if(type.includes("H"))
			{
				Hindex = updateIndex(type,Hnumber,Hindex);
			}
		}
		else
		{
			index = updateIndex(type,pageNumber,index);
		}

		console.log(index);

		// change background
		$('.next, .topButton, .roster, .previous').css("visibility", "visible");;
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
		}

		// toggle content
		$('.pages').removeClass("active");
		if(index != 2)
		{
			$('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").addClass("active");
		}
		else
		{
			if(type.includes("M"))
			{
				$('#chapter'+vocabularyChapter).find("[data-M=page"+Mnumber[Mindex]+"]").addClass("active");
			}
			else if(type.includes("MH"))
			{
				$('#chapter'+vocabularyChapter).find("[data-MH=page"+MHnumber[MHindex]+"]").addClass("active");
			}
			else if(type.includes("H"))
			{
				$('#chapter'+vocabularyChapter).find("[data-H=page"+Hnumber[Hindex]+"]").addClass("active");
			}
		}

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

	$('.M').click(function(e){
		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").addClass("active");
	})

	function countPages (length,n){
		var pageNumber = [];
		for(var i = 0; i < length; i++)
		{
			pageNumber[i] = [n,i+1];
		}
		return pageNumber;
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


})

