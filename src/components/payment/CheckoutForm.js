import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import { ApiGet } from '../../helpers/API/ApiData';

export default function CheckoutForm({ id, submitProposal, handleClose, setPaymentStatus, clientSecret, proposalData, paymentCompleteHandler, setClickOnSubmit }) {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmOrderLoader, setConfirmOrderLoader] = useState(false)
  const [isOrderConfirmed, setIsOrderConfirmed] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setConfirmOrderLoader(true)
    setClickOnSubmit(true)
    if (!stripe || !elements) {
      setConfirmOrderLoader(false)
      setClickOnSubmit(false)
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (result.error) {
      setConfirmOrderLoader(false)
      setClickOnSubmit(false)
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const response = await ApiGet(`campaign/confirm/${id}/${result.paymentIntent.id}`);
        console.log("response",response)
        try {
          if(response.data.status === 200){
            handleClose()
            submitProposal(proposalData, 'accept', 'accept')
            setPaymentStatus(response.data.data.paymentConfirmed)
            setIsOrderConfirmed(response.data.data.paymentConfirmed)
            setClickOnSubmit(false)
            setConfirmOrderLoader(false)
          }
          else{
            console.log("response",response)
          }
        } catch (error) {
          console.log("error",error)
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <Grid item md={4} style={{ margin: '8% 0 0 40%' }}>
        {confirmOrderLoader ?
          <Button
            color="default"
            variant="contained"
            disableElevation
          >
            <CircularProgress color="inherit" size={24} />&nbsp;&nbsp;&nbsp;Loading...
        </Button>
          :
          <Button
            color={isOrderConfirmed ? "default" : "primary"}
            variant="contained"
            type="submit"
            disabled={isOrderConfirmed}
          >
            Confirm payment
        </Button>}
      </Grid>
    </form>
  );
}