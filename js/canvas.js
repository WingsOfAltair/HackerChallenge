////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage;
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	const gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas",{ antialias: true });
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var safeZoneGuide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, exitContainer, optionsContainer, shareContainer, shareSaveContainer, socialContainer;
var guideline, bg, bgP, logo, logoP;
var itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel;
var itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt, buttonShare, buttonSave;
var resultTitleOutlineTxt,resultDescOutlineTxt,resultShareTxt,resultShareOutlineTxt,popTitleOutlineTxt,popDescOutlineTxt;
var buttonSettings, buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit;
$.share = {};

var globe, stageDisplayTxt, stageShape, hubselect, hubTimer, hubTimerBar, hubUnlock, instructionMove;
var itemResult, resultTitleTxt;
var buttonYes,buttonNo;
var hubContainer,lineContainer,stageContainer,stageAnnounceContainer,background,buttonStart;

$hub = {};
$hubType = {};
$line = {};
$point = {};
$lineContainer = {};
$pointContainer = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    exitContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    shareContainer = new createjs.Container();
    shareSaveContainer = new createjs.Container();
    socialContainer = new createjs.Container();
	
	hubContainer = new createjs.Container();
	lineContainer = new createjs.Container();
	stageContainer = new createjs.Container();
	stageAnnounceContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	createHitarea(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 60;
	
	globe = new createjs.Bitmap(loader.getResult('globe'));
	stageDisplayTxt = new createjs.Text();
	stageDisplayTxt.font = "50px source_code_proregular";
	stageDisplayTxt.color = "#fff";
	stageDisplayTxt.text = resultText;
	stageDisplayTxt.textAlign = "center";
	stageDisplayTxt.textBaseline='alphabetic';
	stageDisplayTxt.x = canvasW/2;
	stageDisplayTxt.y = canvasH/100*50;
	stageAnnounceContainer.visible = false;
	
	instructionMove = new createjs.Bitmap(loader.getResult('instructionMove'));
	
	stageShape = new createjs.Shape();
	
	hubselect = new createjs.Bitmap(loader.getResult('hubselect'));
	centerReg(hubselect);
	createHitarea(hubselect);
	hubselect.x = -200;
	
	hubTimer = new createjs.Bitmap(loader.getResult('hubTimer'));
	centerReg(hubTimer);
	createHitarea(hubTimer);
	hubTimer.x = -200;
	
	hubTimerBar = new createjs.Bitmap(loader.getResult('hubTimerBar'));
	centerReg(hubTimerBar);
	createHitarea(hubTimerBar);
	hubTimerBar.x = -200;
	
	hubUnlock = new createjs.Bitmap(loader.getResult('hubUnlock'));
	centerReg(hubUnlock);
	hubUnlock.x = -200;
	
	for(var n=0;n<hublock_arr.length;n++){
		$hubType['hublock_'+n] = new createjs.Bitmap(loader.getResult('hublock_'+n));
		centerReg($hubType['hublock_'+n]);
		createHitarea($hubType['hublock_'+n]);
		
		$hubType['hublock_power_'+n] = new createjs.Bitmap(loader.getResult('hublock_power_'+n));
		centerReg($hubType['hublock_power_'+n]);
		createHitarea($hubType['hublock_power_'+n]);
		
		$hubType['hublock_indicator_'+n] = new createjs.Bitmap(loader.getResult('hublock_indicator_'+n));
		centerReg($hubType['hublock_indicator_'+n]);
		createHitarea($hubType['hublock_indicator_'+n]);
		
		$hubType['hublock_indicator_power_'+n] = new createjs.Bitmap(loader.getResult('hublock_indicator_power_'+n));
		centerReg($hubType['hublock_indicator_power_'+n]);
		createHitarea($hubType['hublock_indicator_power_'+n]);
		
		$hubType['hublock_'+n].x = -200;
		$hubType['hublock_power_'+n].x = -200;
		$hubType['hublock_indicator_'+n].x = -200;
		$hubType['hublock_indicator_power_'+n].x = -200;
		
		gameContainer.addChild($hubType['hublock_'+n], $hubType['hublock_power_'+n], $hubType['hublock_indicator_'+n], $hubType['hublock_indicator_power_'+n]);
	}
	
	for(var n=0;n<hub_arr.length;n++){
		$hubType[n] = new createjs.Bitmap(loader.getResult('hub_'+hub_arr[n].type));
		centerReg($hubType[n]);
		createHitarea($hubType[n]);
		
		$hubType['power'+n] = new createjs.Bitmap(loader.getResult('hub_power_'+hub_arr[n].type));
		centerReg($hubType['power'+n]);
		createHitarea($hubType['power'+n]);
		
		$hubType[n].x = -200;
		$hubType['power'+n].x = -200;
		
		gameContainer.addChild($hubType[n], $hubType['power'+n]);
	}
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "50px source_code_proregular";
	resultTitleTxt.color = "#ccc";
	resultTitleTxt.text = resultText;
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100*30;
	
	resultStageTxt = new createjs.Text();
	resultStageTxt.font = "100px source_code_proregular";
	resultStageTxt.color = "#ffffff";
	resultStageTxt.text = resultStageText;
	resultStageTxt.textAlign = "center";
	resultStageTxt.textBaseline='alphabetic';
	resultStageTxt.x = canvasW/2;
	resultStageTxt.y = canvasH/100*43;

	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "30px source_code_proregular";
	resultShareTxt.color = "#ffffff";
	resultShareTxt.text = shareText;
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';

	shareContainer.x = shareSaveContainer.x = canvasW/2;
    shareContainer.y = shareSaveContainer.y = canvasH/100 * 55;
	
	socialContainer.visible = false;
    socialContainer.scale = 1;
    shareContainer.addChild(resultShareTxt, socialContainer);

    if(shareSettings.enable){
        buttonShare = new createjs.Bitmap(loader.getResult('buttonShare'));
        centerReg(buttonShare);
		createHitarea(buttonShare);
        
        var pos = {x:0, y:45, spaceX:65};
        pos.x = -(((shareSettings.options.length-1) * pos.spaceX)/2)
        for(let n=0; n<shareSettings.options.length; n++){
            var shareOption = shareSettings.options[n];
            var shareAsset = String(shareOption[0]).toUpperCase() + String(shareOption).slice(1);
            $.share['button'+n] = new createjs.Bitmap(loader.getResult('button'+shareAsset));
            $.share['button'+n].shareOption = shareOption;
            centerReg($.share['button'+n]);
            $.share['button'+n].x = pos.x;
            $.share['button'+n].y = pos.y;
            socialContainer.addChild($.share['button'+n]);
            pos.x += pos.spaceX;
        }
        buttonShare.y = (buttonShare.image.naturalHeight/2) + 10;
        shareContainer.addChild(buttonShare);
    }

    if ( typeof toggleScoreboardSave == 'function' ) { 
        buttonSave = new createjs.Bitmap(loader.getResult('buttonSave'));
        centerReg(buttonSave);
		createHitarea(buttonSave);
        buttonSave.y = (buttonSave.image.naturalHeight/2) + 10;
        shareSaveContainer.addChild(buttonSave);
    }
	
	buttonReplay = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonReplay);
	createHitarea(buttonReplay);
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100 * 78;
	
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonMusicOn = new createjs.Bitmap(loader.getResult('buttonMusicOn'));
	centerReg(buttonMusicOn);
	buttonMusicOff = new createjs.Bitmap(loader.getResult('buttonMusicOff'));
	centerReg(buttonMusicOff);
	buttonMusicOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonMusicOn);
	createHitarea(buttonMusicOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	
	buttonYes = new createjs.Bitmap(loader.getResult('buttonYes'));
	centerReg(buttonYes);
	buttonYes.x = canvasW/100* 34;
	buttonYes.y = canvasH/100 * 60;
	
	buttonNo = new createjs.Bitmap(loader.getResult('buttonNo'));
	centerReg(buttonNo);
	buttonNo.x = canvasW/100 * 66;
	buttonNo.y = canvasH/100 * 60;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "45px source_code_proregular";
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *37;
	
	createHitarea(buttonYes);
	createHitarea(buttonNo);
	
	exitContainer = new createjs.Container();
	exitContainer.addChild(itemExit, buttonYes, buttonNo, confirmMessageTxt);
	exitContainer.visible = false;
	
	mainContainer.addChild(logo, buttonStart);
	stageAnnounceContainer.addChild(globe, stageDisplayTxt);
	stageContainer.addChild(lineContainer, hubContainer);
	gameContainer.addChild(hubselect, hubTimer, hubTimerBar, hubUnlock, stageShape, stageContainer, instructionMove, stageAnnounceContainer);
	resultContainer.addChild(resultTitleTxt, resultStageTxt, buttonReplay, shareContainer, shareSaveContainer);
	
	guideline = new createjs.Shape();

	canvasContainer.addChild(background, mainContainer, gameContainer, resultContainer, exitContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
	const cssWidth = stageW * scalePercent;
	const cssHeight = stageH * scalePercent;
	const gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.style.width = cssWidth + "px";
	gameCanvas.style.height = cssHeight + "px";

	gameCanvas.style.left = (offset.left/2) + "px";
	gameCanvas.style.top = (offset.top/2) + "px";
	
	gameCanvas.width = stageW * dpr;
	gameCanvas.height = stageH * dpr;
	
 	if(canvasContainer!=undefined){
		stage.scaleX = stage.scaleY = dpr;
		
		if(safeZoneGuide){	
			guideline.graphics.clear().setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
		}
		
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 65;
		var nextCount = 0;
		buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
		buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
		buttonSoundOn.x = buttonSoundOff.x;
		buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
		if (typeof buttonMusicOn != "undefined") {
			buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
			buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
			buttonMusicOn.x = buttonMusicOff.x;
			buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
			nextCount = 2;
		}else{
			nextCount = 1;
		}
		buttonFullscreen.x = buttonSettings.x;
		buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));

		if(curPage == 'main' || curPage == 'result'){
			buttonExit.visible = false;			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}