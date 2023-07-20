import {register} from "@shopify/web-pixels-extension";

const SEGMENT_API_URL = 'https://api.segment.io/v1';
const TRACK_API_URL = `${SEGMENT_API_URL}/track`;
const IDENTIFY_API_URL = `${SEGMENT_API_URL}/identify`;
const WRITE_KEY = 'zOlAKAUg5nn7HUKkNh7UwHkdsb4Br4c7';

fetch(IDENTIFY_API_URL, {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json',
    "Authorization": "Basic " + btoa(WRITE_KEY)
  },
  body: JSON.stringify({
    "userId": "019mr8mf4r",
    "traits": {
      "email": "test@example.com",
      "name": "Test BAU",
      "industry": "Technology"
    },
    "timestamp": Date.now()
  })
})
  .then(response => response.json())
  .then((result) => {
    console.log("track result: ");
    console.log(result);
  })
  .catch((e) => {
    console.error(`An error occurred: ${e}`)
  });

register(({ configuration, analytics, browser }) => {
    try {
    // Bootstrap and insert pixel script tag here
    // Sample subscribe to page view
    analytics.subscribe('page_viewed', async (event) => {
      console.log('page_viewed', event);
      
      fetch(TRACK_API_URL, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Basic " + btoa(WRITE_KEY)
        },
        body: JSON.stringify({
          "userId": "019mr8mf4r",
          "event": "page_viewed",
          "properties": event,
          "timestamp": Date.now()
        })
      })
        .then(response => response.json())
        .then((result) => {
          console.log("track result: ");
          console.log(result);
        })
        .catch((e) => {
          console.error(`An error occurred: ${e}`)
        });
    });

    analytics.subscribe('checkout_shipping_info_submitted', (event) => {
      console.log('Checkout shipping info submitted', event);
    });

    analytics.subscribe('checkout_address_info_submitted', (event) => {
      console.log('Checkout address info submitted', event);
    });

    analytics.subscribe('checkout_contact_info_submitted', (event) => {
      console.log('Checkout contact info submitted', event);
    });

    analytics.subscribe('payment_info_submitted', (event) => {
      console.log('Payment info submitted', event);
    });

    analytics.subscribe('checkout_completed', (event) => {
      console.log('checkout completed', event);
    });
  } catch(error) {
    console.error(error);
  }
});
