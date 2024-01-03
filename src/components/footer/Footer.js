import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import './Footer.css';
import Popup from "../popup_chat/Popup";

const Footer = () =>{
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const customStyles = {
        width: '35%',
        height: '30%',
        backgroundColor: '#967EA1'
      };

      const handleConfirm = () => {
        closePopup();
        navigate('/chat'); 
      };
    return(
        <>
            <Container className="WholeBlock">
                <Container className="Block" onClick={openPopup}>
                    <Col>
                        <div className="text"><h1>Chat with Stranger(1:1)</h1></div>
                    </Col>
                </Container>
                <Popup isOpen={isPopupOpen} onClose={closePopup} customStyles={customStyles}>
                    <div>
                        <h3>Confirmation</h3>
                        <div><h5>I, here confirm that I agree all terms and conditions provided by E Mate</h5></div>
                        <div><p>*Note: E Mate doesn't collect any personal data from users</p></div>
                        <div> <button onClick={handleConfirm} style={{float: 'right'}}><h5>I'm over 18 years old</h5></button>
                        </div>
                    </div>
                </Popup>    
                <Container className="Block">
                    <Col>
                        <div className="text"><h1>VChat with Stranger</h1></div>
                    </Col>
                </Container>
                <Container className="Block">
                    <Col>
                        <div className="text"><h1>I'm Boring</h1></div>
                    </Col>
                </Container>
            </Container>

        </>
        
    );
};

export default Footer;