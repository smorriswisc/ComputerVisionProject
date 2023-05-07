import React, { useRef, useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as tf from "@tensorflow/tfjs";
import { useOpenCv } from 'opencv-react';

function StreamScreen() {
    const video = useRef(null);
    const outputCanvas = useRef(null);
    const faceCanvas = useRef(null);
    const [stream, setStream] = useState(true);
    const [xmlLoaded, setXmlLoaded] = useState(false);
    const [binsLoaded, setBinsLoaded] = useState(false);
    const [disableStreamButton, setDisableStreamButton] = useState(true);
    const [buttonText, setButtonText] = useState("Enable Stream");
    const [statusText, setStatusText] = useState("Loading OpenCV");
    const [streamObject, setStreamObject] = useState([]);
    const { loaded, cv } = useOpenCv();
	
	const modelData = require("../model/new_model.json");
	const bin1 = require("../model/group1-shard1of5.bin");
	const bin2 = require("../model/group1-shard2of5.bin");
	const bin3 = require("../model/group1-shard3of5.bin");
	const bin4 = require("../model/group1-shard4of5.bin");
	const bin5 = require("../model/group1-shard5of5.bin");
	const faceCascadeData = require("../model/haarcascade_frontalface_default.xml");
	
	useEffect(() => {
		if (loaded) {
            setStatusText("Ready to Start");
			setDisableStreamButton(false);
		}
	}, [loaded])

    function enableStream() 
    {
        setStream(!stream);
        if (stream)
        {
            setButtonText("Disable Stream");
            setStatusText("Streaming");
            logic();
        }
        else
        {
            setButtonText("Enable Stream");
            setStatusText("Ready to Start");
			if (streamObject && streamObject.getTracks)
			{
				streamObject.getTracks().forEach(function(track) {
					track.stop();
				  });
			}
			const video = document.getElementById('video');
			video.pause();
        }
    }

    async function logic()
    {
        const video = document.getElementById('video');
        const outputCanvas = document.getElementById('outputCanvas');
        const faceCanvas = document.getElementById('faceCanvas');
        const outContext = outputCanvas.getContext('2d', { willReadFrequently: true });
        const faceContext = faceCanvas.getContext('2d', { willReadFrequently: true });

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (streamO) {
                setStreamObject(streamO);
                video.srcObject = streamO;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
                setStatusText("An error occurred: " + err);
            });

        try
        {
		
			function createFileFromUrl(path, url) {
				return new Promise((resolve, reject) => {
					const request = new XMLHttpRequest();
					request.open('GET', url, true);
					request.responseType = 'arraybuffer';
					request.onload = function() {
						if (request.readyState === 4) {
							if (request.status === 200) {
								let data = new Uint8Array(request.response);
								cv.FS_createDataFile('', path, data, true, false, false);
								resolve();
							} else {
								console.printError('Failed to load ' + url + ' status: ' + request.status);
								reject(new Error('Failed to load ' + url + ' status: ' + request.status));
							}
						}
					};
					request.send();
				});
			};
			
            const faceCascade = new cv.CascadeClassifier();
			
			if(!xmlLoaded)
			{
				await createFileFromUrl("haarcascade_frontalface_default.xml", faceCascadeData);
				setXmlLoaded(true);
			}
			let loadSuccess = faceCascade.load("haarcascade_frontalface_default.xml");
			if (!loadSuccess)
			{
				console.log("Unable to load xml");
				setStatusText("Unable to load xml");
				setStream(false);
				return;
			}
			
			if(!binsLoaded)
			{
				await createFileFromUrl("group1-shard1of5.bin", bin1);
				await createFileFromUrl("group1-shard2of5.bin", bin2);
				await createFileFromUrl("group1-shard3of5.bin", bin3);
				await createFileFromUrl("group1-shard4of5.bin", bin4);
				await createFileFromUrl("group1-shard5of5.bin", bin5);
				setBinsLoaded(true);
			}
			let response = await fetch(bin1);
			let buffer = await response.arrayBuffer();
			const bin1Content = new Uint8Array(buffer);
			
			response = await fetch(bin2);
			buffer = await response.arrayBuffer();
			const bin2Content = new Uint8Array(buffer);
			
			response = await fetch(bin3);
			buffer = await response.arrayBuffer();
			const bin3Content = new Uint8Array(buffer);
			
			response = await fetch(bin4);
			buffer = await response.arrayBuffer();
			const bin4Content = new Uint8Array(buffer);
			
			response = await fetch(bin5);
			buffer = await response.arrayBuffer();
			const bin5Content = new Uint8Array(buffer);
			
			const files = [
			  new File([bin1Content], 'group1-shard1of5.bin'),
			  new File([bin2Content], 'group1-shard2of5.bin'),
			  new File([bin3Content], 'group1-shard3of5.bin'),
			  new File([bin4Content], 'group1-shard4of5.bin'),
			  new File([bin5Content], 'group1-shard5of5.bin')
			];
			const jsonStr = JSON.stringify(modelData);
			const modelblob = new Blob([jsonStr], {type: 'application/json'});
			const model = await tf.loadLayersModel(tf.io.browserFiles([modelblob, ...files]));
			
            function processVideo()
            {
				if (video.paused || video.ended) 
				{
					video.removeEventListener('play', reqAnimFram);
					return;
				}
			
				let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
				let gray = new cv.Mat();
				let faces = new cv.RectVector();
				
				try
				{
					
					outContext.drawImage(video, 0, 0, outputCanvas.width, outputCanvas.height);
					let imageData = outContext.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
					src.data.set(imageData.data);
	
					cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY, 1);
					var minSize = {
						height: 0,
						width: 0
					};
					var maxSize = {
						height: video.width,
						width: video.height
					};
					
					try
					{
						faceCascade.detectMultiScale(gray, faces, 1.3, 5, 0, minSize, maxSize);
					}
					catch(ptr)
					{
						let err = cv.exceptionFromPtr(ptr);
						console.log("An error occurred: " + err.msg);
						setStatusText("An error occurred: " + err.msg);
						video.removeEventListener('play', reqAnimFram);
						setStream(false);
						return;
					}
					
					if (faces.size() == 0)
					{
						faceContext.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
					}
	
					// Extract features and classify emotions using the pre-trained model
					for (let i = 0; i < faces.size(); i++) 
					{
						tf.tidy(() => {
							let face = faces.get(i);
							let faceImg = gray.roi(face);
							cv.resize(faceImg, faceImg, new cv.Size(48, 48));
							cv.imshow(faceCanvas, faceImg);
							
							const roiTensor = tf.browser.fromPixels(faceCanvas, 1).expandDims(0);
							const prediction = model.predict(roiTensor);
							
							let emotions = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise'];
							let predictionData = prediction.dataSync();
							let maxIndex = 0;
							for (let j = 1; j < predictionData.length; ++j) {
								if (predictionData[j] > predictionData[maxIndex]) {
									maxIndex = j;
								}
							}
							let emotion = emotions[maxIndex];
							let textSize = Math.max(face.width / 10, 16);
							outContext.font = textSize + "px Arial";
							outContext.fillStyle = "red";
							let perc = Math.round(predictionData[maxIndex] * 100);
							outContext.fillText(emotion + " " + perc + "%", face.x + 0.5 * (face.width - textSize * emotion.length), face.y - 5);
							
							outContext.beginPath();
							outContext.lineWidth = "3";
							outContext.strokeStyle = "red";
							outContext.rect(face.x, face.y, face.width, face.height);
							outContext.stroke();
							
							faceImg.delete();
						});
					}
				}
				catch(err)
				{
					if(typeof err == 'number')
					{
						err = cv.exceptionFromPtr(err);
					}
					console.log("An error occurred: " + err);
					setStatusText("An error occurred: " + err);
					video.removeEventListener('play', reqAnimFram);
					setStream(false);
					return;
				}
				
				src.delete();
				gray.delete();
				faces.delete();
				
				requestAnimationFrame(processVideo);
            }
			
			function reqAnimFram()
			{
				requestAnimationFrame(processVideo);
			};

            video.addEventListener('play', reqAnimFram);
        }catch(err)
        {
			if(typeof err == 'number')
			{
				err = cv.exceptionFromPtr(err);
			}
			console.log("An error occurred: " + err);
			setStatusText("An error occurred: " + err);
			setStream(false);
			return;
        }
		
    };

    return (
        <Container className='myContainer' id='StreamContainer'>
            <h1 className='blue'>Stream</h1>
			<p>
				The below implementation runs locally in your browser. If you have a webcam, you can play with the model and see what emotions it detects.
			</p>
			<h4>Implementation Steps:</h4>
			<ol>
				<li>Request webcam access from the browser and user.</li>
				<li>Extract image from webcam video</li>
				<li>Convert the image into gray scale</li>
				<li>Recognize faces in the scene and display a rectangle around the face. This is done with OpenCV.</li>
				<li>For each identified face, extract the face and resize to 48x48.</li>
				<li>Use the CNN classifier to predict the emotion expressed by the face in the frame.</li>
				<li>Display the predicted emotion over the rectangle.</li>
			</ol>
			<p>Note that your video stream is not uploaded anywhere and is only used locally.</p>
			
            <div>
                <div className="streams">
					<div>
						<h3>Input</h3>
						<video className='borderClass' id="video" width="640" height="480" autoPlay
							ref={video}></video>
					</div>
					<div>
						<h3>Output</h3>
						<canvas className='borderClass' id="outputCanvas" width="640" height="480"
							ref={outputCanvas}></canvas>
					</div>
                </div>
				<div>
					<canvas className='borderClass' id="faceCanvas" width="48" height="48"
                        ref={faceCanvas}></canvas>
				</div>
                <div>
                    <input type="button" id="enableButton" onClick={enableStream} value={buttonText} disabled={disableStreamButton}></input>
                    <h4>Status:</h4>
                    <p>{statusText}</p>
                </div>
            </div>
        </Container>

    );
	
}

export default StreamScreen;