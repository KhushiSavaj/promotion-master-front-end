import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IC6MVC79xcHe3tCOPha6EfCJxdmFP8Lc9UsLMXedOPd5Rw8xK0bQ0UvkFyfUzYtoA0mOuhZFHRXLNRqHTsb6li500i9boEwOe");

export default function AppPayment({clientSecret,proposalData,handleClose,setClickOnSubmit,setPaymentStatus,submitProposal,paymentCompleteHandler,id}) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm setClickOnSubmit={setClickOnSubmit} id={id}handleClose={handleClose} proposalData={proposalData} setPaymentStatus={setPaymentStatus} clientSecret={clientSecret}submitProposal={(data,status,fromPayment)=>submitProposal(data,status,fromPayment)} paymentCompleteHandler={paymentCompleteHandler}/>
    </Elements>
  );
};

