
import React from 'react';
import Container from 'react-bootstrap/Container';

function ResultsScreen() {

    return (
        <Container className='myContainer' id='ResultsContainer'>
            <h1 className='orange'>Results</h1>
			
			<h3>Evaluation</h3>
			<p>Even though I used the same training set and the same CNN model to start with, the accuracy of my trained model is slightly different than what was reported by <a href="https://www.kaggle.com/code/piyushjain16/facial-emotion-detection">piyushjain16</a>.</p>
			
			<p>My model achieved an upper accuracy of 72.0%, while the online model reached 72.1%.</p>
			<p>The Javascript embedded model seems to suffer from some inconsistency as well. The model will run perfectly fine when running from Python source, but Javascript has a strange behavior where the initial prediction is accurate, but each subsequent prediction is not. Enabling and Disabling the stream seems to be a workaround.</p>
			
			<p>My code repository can be found here <a href = "https://github.com/smorriswisc/ComputerVisionProject">https://github.com/smorriswisc/ComputerVisionProject</a></p>
		
		</Container>

    );
}

export default ResultsScreen;