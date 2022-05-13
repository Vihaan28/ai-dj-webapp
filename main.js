sound1="";
sound2="";
lefty ="";
leftx = "";
rightx = "";
righty = "";
scoreleftwrist="";
song1ststus="";
song2status="";


function setup(){
    canvas = createCanvas(500 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modalLoaded);
    poseNet.on("pose" , gotPoses);

}

function draw(){
   image( video , 0 , 0 , 500 , 400);

   song1ststus=sound1.isPlaying();
   song2ststus=sound2.isPlaying();
   
   fill("red");
   stroke("red");

   if( scoreleftwrist > 0.2){
    circle(leftx , lefty , 20 );
    sound2.stop();
    
    if(song1ststus == false){
        sound1.play();
        document.getElementById("songname_id").innerHTML = "playing mood ";
    }

   }


}

function preload(){
 sound1=loadSound("music.mp3");
 sound2=loadSound("song.mp3");

}



function stop(){
    sound1.stop();
    sound2.stop();

}


function pause(){
    sound1.pause();
    sound2.pause();
    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftx = results[0].pose.leftWrist.x;
        lefty = results[0].pose.leftWrist.y;

        console.log( "left Wrist X = " + leftx + " left wrist y = " + lefty);

        rightx = results[0].pose.rightWrist.x;
        righty = results[0].pose.rightWrist.y;

        console.log( "right Wrist X = " + rightx + " right wrist y = " + righty);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log(" score left wrist = " + scoreleftwrist);
    }
}
function modalLoaded(){
    console.log("poseNet is started");
}