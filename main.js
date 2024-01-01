song = "";
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function setup() {
  canvas = createCanvas(700, 530);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}
function modelLoaded() {
  console.log(" Posenet Model Is Initalized");
}


	function draw() {
        image(video, 0, 0, 600, 500);
        fill("#FF0000");
        stroke("#FF0000");
        if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/530;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);		
    }
}


function preload() {
  song = loadSound("music.mp3");
}
function playlist() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}
function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}