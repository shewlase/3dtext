var screenWidth;
var screenHeight;

var colors = ['#ffce67', '#acdacf', '#85c3dc', '#2176AE','#FBB13C', '#FE6847', '#f27a86', '#2E86AB'];
var mainText, frontText;
var fontSizeInput, thicknessSlider, rotationSlider, wholeRotationSlider, strokeToggle;
var xPerspectiveSlider, yPerspectiveSlider;
var xPerspective, yPerspective;
var allClones;
var fontDropdown;
var thickness = 20;
var rotation = 0;
var wholeRotation = 0;
var isStroked = true;
var allFonts = ['Righteous', 'Baloo', 'Paytone One', 'Arial'];
init();

function init()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight; //change to div height?
	allClones = [];
	mainText = document.getElementById('words');
	mainText.value = 'Type here.';
	fontSizeInput = document.getElementById('fontSizeSlider');
	thicknessSlider = document.getElementById('thicknessSlider');
	rotationSlider = document.getElementById('rotationSlider');
	wholeRotationSlider = document.getElementById('wholeRotationSlider');
	strokeToggle = document.getElementById('strokeToggle');
	xPerspectiveSlider = document.getElementById('xPerspectiveSlider');
	yPerspectiveSlider = document.getElementById('yPerspectiveSlider');

  fontDropdown = document.getElementById("fontSelector");
	xPerspective = 100;
	yPerspective = -100;
	makeThreeD(mainText);
	buildFontSelector();
	// makeThreeD(document.getElementById('words2'));
	// makeThreeD(document.getElementById('words3'));
}

function makeThreeD(element)
{
	//duplicate element x times, changing z index a little
	// let words = document.getElementById('words');
	if(thickness > 1)
	{
	// 	// element.style.color = 'hsl()'; //sideColor
		element.style.color = '#2176AE'; //sideColor
	}
	else
	{
		element.style.color = 'white';
	}
	let rotationIncrement = rotation/thickness;
	for(let i = 1; i < thickness; i++)
	{
		let clone = element.cloneNode(true);
		// let zDistance = (i*0.1)+4;
		let zDistance = -1*i*0.1;
		let rotation = i*rotationIncrement +wholeRotation;
		// let rotation = i*5;   //really cool!
		clone.style.transform = 'translateZ('+zDistance+'vw) rotateZ('+rotation+'deg)';
		// clone.style.transform = 'translateZ('+zDistance+'vw)';

		// let colorIncrement = i/thickness*350;
		// clone.style.color = 'hsl('+colorIncrement+',100%,50%)';

		if(i == thickness-1)
		{
			element.style.color = 'white';

			// frontText = clone;
			element.onkeydown = function(event)
			{
				setTimeout(function()
				{
			// 	// 	mainText.value = frontText.value;
					removeAllClones();
					makeThreeD(mainText);
					// frontText.focus();
				}, 0.5);
			// //
			}
			// clone.style.color = 'white';
		}
		allClones.push(clone);
		// clone.style.transform = 'translateZ('+i*0.5*-1+'vw)';
		// document.body.appendChild(clone);

		//spring out
		// setTimeout(function()
		// {
				// element.parentElement.appendChild(clone);
				element.parentElement.insertBefore(clone ,element);
		// }, i*100);
	}
	element.focus();
}

var fontDropdown;
// var allFonts = ['Righteous', 'Baloo', 'Paytone One'];
function buildFontSelector()
{
  //create option element, add to select element
  // fontDropdown.onChange = ;

  for(let i = 0; i < allFonts.length; i++)
  {
    let currentFont = document.createElement('option');
    let currentFontName = allFonts[i];
    currentFont.value = currentFontName;
    currentFont.innerHTML = currentFontName;
    currentFont.style.fontFamily = currentFontName;
    // currentFont.onmousedown = function(event)
		// {
		// 	changeFont(event.target.value);
		// };
  	fontDropdown.appendChild(currentFont);
  }
  // var title = document.querySelector("#firstPage");
  // document.body.insertBefore(newDiv,title);
}

// function changeFont(fontName)
function changeFont()
{
  //change font-family of selected text element
  let selectedFontName = fontDropdown.options[fontDropdown.selectedIndex].value;
  // fontDropdown.style.fontFamily = selectedFontName;
  // focusedElement.font = selectedFontName;
  // fontDropdown.style.fontFamily = selectedFontName;
  // focusedElement.updateHtmlElement();
  mainText.style.fontFamily = selectedFontName;
	removeAllClones();
	makeThreeD(mainText);
  // fontDropdown.style.fontFamily = "Righteous";
}

window.onkeydown = function(e)
{
  // if([37, 38, 39, 40].indexOf(e.keyCode) > -1)
  // {
  //     e.preventDefault();
  // }
	// //LURD = 0123
  //   // case 37:
  //   //   nudgeElements(0);
  //   //   break;
	// switch (e.keyCode)
	// {
  //   case 38:
	// 	//move menu, change color, 3d current item
	// 		// document.getElementById('menu').style.top = menuPosition*0.04*screenWidth;
  //   break;
  //   case 40:
	// 		// document.getElementById('menu').style.top = menuPosition*0.04*screenWidth;
  //     break;
	// }
}
let maxDegrees = 30;
window.onmousemove = function( event ) {


	// var clickX = event.pageX/screenWidth;
	// var clickY = 0.5*event.pageY/screenHeight;
	// var yDegrees = (clickX*maxDegrees)-0.5*maxDegrees;
	// var xDegrees = -(clickY*maxDegrees)+0.35*maxDegrees;
	// document.body.style.transform = 'rotateY('+yDegrees+'deg) rotateX('+xDegrees+'deg)';

	// document.getElementById('wordsContainer').style.transform = 'rotateY('+yDegrees+'deg) rotateX('+xDegrees+'deg)';
	var mouseX = event.pageX/screenWidth;
	var mouseY = event.pageY/screenHeight;
	//mouse x and y could be only if perspective changer hovered over
	  //e.g. changer mouseX past changerX/changer width

	//between 40 and 0-1*w
	var originX = ((mouseX * 200) -100);
	var originY = ((mouseY * 300) -150);

	// document.body.style.perspectiveOrigin = originX+'vw '+originY+'vw ';
	// document.getElementById('wordsContainer').style.perspectiveOrigin = originX+'vw '+originY+'vh ';

};

fontSizeInput.oninput = function(event)
{
  let newSize = this.value/10;
	mainText.style.fontSize = newSize+'vw';

	removeAllClones();
	makeThreeD(mainText);
	//update all clones
}

thicknessSlider.oninput = function(event)
{
  thickness = this.value;

	removeAllClones()
	makeThreeD(mainText);
	//update all clones
}

rotationSlider.oninput = function(event)
{
  rotation = this.value/100*120-60;

	removeAllClones();
	makeThreeD(mainText);
	//update all clones
}

wholeRotationSlider.oninput = function(event)
{

	wholeRotation = this.value/100*180-90;
	removeAllClones();
	mainText.style.transform = 'rotate('+wholeRotation+'deg)';
	makeThreeD(mainText);
	// document.getElementById('wordsContainer').style.transformOrigin = '100% 50%';
	// document.getElementById('wordsContainer').style.transform = 'rotate('+wholeRotation+'deg)';
	//update all clones
}

strokeToggle.onmousedown = function(event)
{
	toggleStroke();
	removeAllClones();
	makeThreeD(mainText);
}

xPerspectiveSlider.oninput = function(event)
{
	xPerspective = this.value/100*200-100;
	updatePerspective();
	// document.getElementById('wordsContainer').style.perspectiveOrigin = originX+'vw '+originY+'vh ';

}
yPerspectiveSlider.oninput = function(event)
{
	yPerspective = this.value/100*300-150;
	updatePerspective();
}



function updatePerspective()
{
	document.getElementById('wordsContainer').style.perspectiveOrigin = xPerspective+'vw '+yPerspective+'vh ';
}

function toggleStroke()
{
	isStroked = !isStroked;
	if(isStroked)
	{
		strokeToggle.style.boxShadow = '0.5vw 0.5vw black';
		strokeToggle.style.transform = '';
		mainText.classList.remove('threeNoStroke');
		mainText.classList.add('three');
	}
	else
	{
		strokeToggle.style.boxShadow = 'none';
		strokeToggle.style.transform = 'translateX('+0.5+'vw) translateY('+0.5+'vw)';
		mainText.classList.remove('three');
		mainText.classList.add('threeNoStroke');
	}

}

function removeAllClones()
{
	for(let i = 0; i < allClones.length; i++)
	{
		let currentClone = allClones[i];
		currentClone.remove();
	}
	allClones = [];
	// parent.removeChild(child);
}
