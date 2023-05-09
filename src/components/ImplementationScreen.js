
import React from 'react';
import Container from 'react-bootstrap/Container';
import cnnPic from '../Figures/cnn_3.png';
import lossPic from '../Figures/Loss.png';
import accuracyPic from '../Figures/Accuracy.png';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function ImplementationScreen() {

    return (
        <Container className='myContainer' id='ImplementationContainer'>
            <h1 className='purple'>Implementation</h1>
			
			<h2>Dataset</h2>
			<p>Our model was trained with the images from the open dataset <a href = "https://www.kaggle.com/datasets/msambare/fer2013">FER-2013</a> available from Kaggle. This dataset consists of 32,298 48x48 grayscale images. The images in dataset vary in age, pose and occlusion (<a className = 'cite' href = "#Goodfellow_2015">Goodfellow et al., 2015</a>). The dataset was split into training and testing as indicated in Table 1.</p>

			<table className='center_table'>
				<tbody>
					<tr>
						<th>Emotion</th>
						<th className="rightAlign">Training</th>
						<th className="rightAlign">Testing</th>
					</tr>
					<tr>
						<td>Anger</td>
						<td className="rightAlign">3,995</td>
						<td className="rightAlign">958</td>
					</tr>
					<tr>
						<td>Disgust</td>
						<td className="rightAlign">436</td>
						<td className="rightAlign">111</td>
					</tr>
					<tr>
						<td>Fear</td>
						<td className="rightAlign">4,097</td>
						<td className="rightAlign">1,024</td>
					</tr>
					<tr>
						<td>Happy</td>
						<td className="rightAlign">7,215</td>
						<td className="rightAlign">1,774</td>
					</tr>
					<tr>
						<td>Neutral</td>
						<td className="rightAlign">4,965</td>
						<td className="rightAlign">1,233</td>
					</tr>
					<tr>
						<td>Sad</td>
						<td className="rightAlign">4,830</td>
						<td className="rightAlign">1,247</td>
					</tr>
					<tr>
						<td>Surprise</td>
						<td className="rightAlign">3,171</td>
						<td className="rightAlign">831</td>
					</tr>				
				</tbody>
			</table>
			<p className="imageCaption">Table 1: Facial emotion recognition training and testing datasets</p>
			
			<h2>Model</h2>
			<p>I followed the training steps as described in this Kaggle resource: <a href="https://www.kaggle.com/code/piyushjain16/facial-emotion-detection">Facial Emotion Detection</a>.</p>
			<p>This model is based on a Convolutional Neural Network (CNN). CNNs are a type of neural network that is particularly well-suited for image recognition and computer vision tasks. CNNs are inspired by the structure of the human visual cortex, which processes information in a hierarchical manner. CNNs use a series of convolutional layers to extract features from an input image, followed by one or more fully connected layers to perform the classification task. The convolutional layers use a set of filters, also known as kernels or weights, to scan the image and detect patterns such as edges, corners, and shapes. Pooling layers are used to reduce the size of the feature maps and introduce some translation invariance to the network. CNNs have achieved state-of-the-art results in a variety of image recognition tasks, including object detection, face recognition, and image segmentation. They have also been successfully applied to other domains, such as natural language processing and speech recognition, by using different types of convolutions and pooling operations.</p>
			
			<div className="largeImageSection">
				<Zoom>
					<img src={cnnPic} alt="CNN Architecture" width={800}></img>
				</Zoom>
				<p className="imageCaption">
					 This is a diagram that illustrated the architecture of the CNN model. Click to Zoom.
				</p>
			</div>
			
			<p>A new Jupyter Notebook was created and a model was trained off of the above dataset. After running for over an hour on my computer, I was able to train the model with the following results:</p>
			
			
			<Zoom>
				<img src={accuracyPic} className="myImage" alt="Graph of Accuracy"></img>
			</Zoom>
			<Zoom>
				<img src={lossPic} className="myImage" alt="Graph of Loss"></img>
			</Zoom>
			<p className="imageCaption">Images 1 and 2: Change in accuracy and loss as training progresses through 15 epochs.</p>
			<div>
				<h4>Accuracy</h4>
				<p className="code">training         	 (min:    0.286, max:    0.720, cur:    0.720)</p>
				<p className="code">validation       	 (min:    0.369, max:    0.650, cur:    0.647)</p>
			</div>
			<div>
				<h4>Loss</h4>
				<p className="code">training         	 (min:    0.755, max:    1.931, cur:    0.755)</p>
				<p className="code">validation       	 (min:    0.978, max:    1.618, cur:    0.991)</p>
			</div>
			
			<h2>Integration</h2>
			
            <p>Once I had the model trained, I was able to save this model into a Keras HDF5 file for reuse. This file can then be <a href="https://www.tensorflow.org/js/guide/conversion">converted</a> into a TensorFlow.js JSON format.</p>
			<p>This JSON model has been loaded into Javascript and for use below.</p>
			


        </Container>

    );
}

export default ImplementationScreen;