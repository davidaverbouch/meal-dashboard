import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Dialog, DialogTitle, DialogContent, Slide } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { storeMsg } from './MealslistContainerSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    const [openModal, setOpenModal] = React.useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("ouverture de la page contact - componentDidMount")
        return () => {
            // console.log("fermeture de la page contact - componentWillUnmount")
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendContact = () => {
        // I don't have time to make good validator
        setNameValueError(nameValue === '')
        setEmailValueError(emailValue === '')
        setMsgValueError(msgValue === '')

        if (nameValueError || emailValueError || msgValueError) console.log('error')
        else {
            // I don't understand why use redux here, maybe just for the test, I use the action
            dispatch(storeMsg({ nameValue, emailValue, msgValue }))
            setOpenModal(true)
        }
    }

    return (
        <ContactBloc>
            <h1>Contact us</h1>
            <TextField error={nameValueError} value={nameValue} onChange={(e) => { setNameValueError(false); setNameValue(e.target.value) }} placeholder="Your name" label="Your name" style={{ marginTop: '1em' }} />
            <TextField error={emailValueError} value={emailValue} onChange={(e) => { setEmailValueError(false); setEmailValue(e.target.value) }} placeholder="Your email" label="Your email" style={{ marginTop: '1em' }} />
            <TextField error={msgValueError} value={msgValue} onChange={(e) => { setMsgValueError(false); setMsgValue(e.target.value) }} placeholder="Your message on multi lines" label="Your message" multiline style={{ marginTop: '1em' }} />
            <Button style={{ marginTop: '1em' }} onClick={sendContact}>Submit</Button>

            <Dialog open={openModal} TransitionComponent={Transition} keepMounted onClose={() => setOpenModal(false)} >
                <DialogTitle>{nameValue}</DialogTitle>
                <DialogContent>
                    <div style={{ fontWeight: '700', fontSize: '.75em' }}>E-mail :</div>
                    <div style={{ color: '#999', fontSize: '.75em' }}>{emailValue}</div>
                    <div style={{ fontWeight: '700', fontSize: '.75em' }}>Content of message :</div>
                    <div>{msgValue}</div>
                </DialogContent>
            </Dialog>
        </ContactBloc>
    );
}
