import React from 'react';
import Container from 'react-bootstrap/Container';


function ProjectProposal() {

    return (

    <Container className='myContainer pinkContainer' id='PPContainer'>
		<h1 className='pink'>Project proposal</h1>
		<h2>Problem and Relevance</h2>
		<p>
			Emotional Analysis is an important cross platform field which is useful in various domains such as:
		</p>
		<ul>
			<li><span className='bold'>Understanding human behavior:</span> Emotions play a significant role in human behavior and decision making.</li>
			<li><span className='bold'>Human-computer interaction:</span> By detecting the emotions of the user, the computer can directly adjust its behavior and responses to better suit the user's needs and emotions. 
				Designers can also make note of the user's emotions to change the design of the system after studying the user's interactions.</li>
			<li><span className='bold'>Security and surveillance:</span> By detecting suspicious behavior and emotions, security personnel can take appropriate action to prevent potential threats.</li>
		</ul>
		<p>
			Emotion recognition systems identify features in verbal and non-verbal communication to identify and quantify the emotions expressed (<a className = 'cite' href = "#fragopanagos_2005">Fragopanagos & Taylor, 2005</a>; 
			<a className = 'cite' href = "#zhao_2020">Zhao et al., 2020</a>). 
			Data on users' emotional reactions when interacting with online applications is valuable for a wide range of fields education, healthcare, customer service, 
			entertainment (<a className = 'cite' href = "#fragopanagos_2005">Fragopanagos & Taylor, 2005</a>), and criminology (<a className = 'cite' href = "#podoletz_2022">Podoletz, 2022</a>). 
			The main signals in emotion analysis are facial expressions, speech, arm gestures, language, and physiological patterns (<a className = 'cite' href = "#zhao_2020">Zhao et al., 2020</a>). 
			Emotion recognition from facial expressions involves computer vision, machine learning, and deep learning algorithms. </p>
			<p>Automated customer service (<a className = 'cite' href = "#zendesk_2022">Zendesk, 2022</a>), hybrid work (<a className = 'cite' href = "#accenture_2021">Accenture, 2021</a>), 
			and distance learning (<a className = 'cite' href = "#venable_2022">Venable, 2022</a>) are becoming more common, raising the need for natural and personalized interactions with computers. 
		</p>

		<h2>State of the Art</h2>
		<p>
		In the context of online applications, the output must be accurate, real-time, and computationally efficient (<a className = 'cite' href = "#hossain_2017">Hossain & Muhammad, 2017</a>). 
		Models that analyze images or complete video sequences do not provide an immediate output, therefore, are not suitable for online applications (<a className = 'cite' href = "#hossain_2017">Hossain & Muhammad, 2017</a>). 
		Although different frameworks have been proposed, identifying emotions from facial expressions commonly involves face detection, feature extraction, and facial expression classification. 
		In the case of video, dynamic features are extracted using temporal segmentation (<a className = 'cite' href = "#suk_0214">Suk & Prabhakaran, 2014</a>). 
		</p>
		<p>
		Deep learning methods, such as CNNs, can learn directly from the image, outperforming methods that rely on handcrafted feature extraction (<a className = 'cite' href = "#Kahou_2015">Kahou et al., 2015</a>). 
		Because emotions are dynamic RNN (<a className = 'cite' href = "#Kahou_2015">Kahou et al., 2015</a>) and LSTM (<a className = 'cite' href = "#Hassouneh_2020">Hassouneh et al., 2020</a>) have been implemented do consider also spatiotemporal information captured in video. 
		However, deep-learning methods require more computational power and memory (<a className = 'cite' href = "#Ko_2018">Ko, 2018</a>). To be accurate deep-learning approaches require large amounts of learning data. 
		Open data sets for facial emotion recognition are available. Some examples are CK +, FER-2013, Affectnet, and DISFA. 
		These data sets differ in collection method, type of media, number of images or video clips, emotion categories, number of individuals, and diversity (<a className = 'cite' href = "#Ko_2018">Ko, 2018</a>). 
		Combined emotions and interclass variability (<a className = 'cite' href = "#Kahou_2015">Kahou et al., 2015</a>) are challenges when training models with these type of datasets).
		</p>
		
		<h2>Motivation and Approach</h2>
		<p>
			Emotional analysis involves detecting and analyzing human emotions from visual cues such as facial expressions, body language, and voice tone. 
			In the context of crime detection, it can be used to identify individuals who may be involved in a crime, either as perpetrators or witnesses. 
			Security cameras can be equipped with facial recognition and emotional analysis capabilities to detect and track individuals who exhibit suspicious emotions, 
			such as fear, anger, or anxiety. These emotions may be indicative of criminal or terrorist activity, and detecting them early can allow security personnel to 
			respond quickly and prevent potential threats.  Additionally, emotional analysis can also be used to detect and prevent insider threats, such as employees who 
			may be planning to steal or leak sensitive information. By monitoring the emotions of employees, such as stress or anxiety, security personnel can identify 
			individuals who may be experiencing personal or professional issues that could lead to security breaches. However, it is important to note that emotional 
			analysis should not be the sole basis for making security decisions and should be used in conjunction with other security measures, such as physical 
			security and access control.
		</p>
		<p>
			Because this project is presented in a web format, we were motivated to focus on emotion analysis for online applications. 
			Our goal is that instructors and anyone that visits our website can interact with our project. Our objective is to develop a 
			program that identifies emotion in real-time video captured through a webcam. We are using an open-source data set to train a deep learning model.  
			The model uses a cascaded classifier to detect faces in the video frames. The grayscale face region is then passed through the trained model,
			which classifies facial expressions as anger, disgust, fear, happiness, sadness, surprise, or neutral. This is an already existing framework for 
			emotion recognition which allows us to compare the performance and accuracy of our implementation with previous work.
		</p>
	
	</Container>

    );
}

export default ProjectProposal;