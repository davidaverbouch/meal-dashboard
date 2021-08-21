import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

const ContactBloc = styled.div`
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  min-width: 66%;
  max-width: 75%;
  padding: 2em 4em;
  border-radius: 8px;
  border: 1px solid #fafafa;
  box-shadow: 0 1px 2px #ccc;
`;

export default function Contact(props) {

    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [msgValue, setMsgValue] = useState('');

    const [nameValueError, setNameValueError] = useState(false);
    const [emailValueError, setEmailValueError] = useState(false);
    const [msgValueError, setMsgValueError] = useState(false);

    useEffect(() => {
        console.log("ouverture de la page contact - componentDidMount")
        return () => {
            console.log("fermeture de la page contact - componentWillUnmount")
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendContact = () => {
        // I don't have time to make good validator
        setNameValueError(nameValue === '')
        setEmailValueError(emailValue === '')
        setMsgValueError(msgValue === '')

        if (nameValueError || emailValueError || msgValueError) console.log('error')
        else console.log('yes')
    }

    return (
        <ContactBloc>
            <h1>Contact us</h1>
            <TextField error={nameValueError} value={nameValue} onChange={(e) => { setNameValueError(false); setNameValue(e.target.value) }} placeholder="Your name" label="Your name" style={{ marginTop: '1em' }} />
            <TextField error={emailValueError} value={emailValue} onChange={(e) => { setEmailValueError(false); setEmailValue(e.target.value) }} placeholder="Your email" label="Your email" style={{ marginTop: '1em' }} />
            <TextField error={msgValueError} value={msgValue} onChange={(e) => { setMsgValueError(false); setMsgValue(e.target.value) }} placeholder="Your message on multi lines" label="Your message" multiline style={{ marginTop: '1em' }} />
            <Button style={{ marginTop: '1em' }} onClick={sendContact}>Submit</Button>
        </ContactBloc>
    );
}
