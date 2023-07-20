import React from 'react';
import {
  render,
  useBuyerJourneyIntercept,
  useShippingAddress,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::DeliveryAddress::RenderBefore', () => <App />);

function App() {
  const address = useShippingAddress();
  console.log('Country code: ' + address?.countryCode);
  console.log('State code: ' + address?.provinceCode);

  useBuyerJourneyIntercept(
    ({ canBlockProgress }) => {
      return canBlockProgress &&
        address?.countryCode &&
        address.countryCode !== 'AU'
        ? {
          behavior: 'block',
          reason: 'Invalid shipping country',
          errors: [
            {
              message:
                'Sorry, we can only ship to Australia',
              // Show an error underneath the country code field
              target:
                '$.cart.deliveryGroups[0].deliveryAddress.countryCode',
            },
            {
              // In addition, show an error at the page level
              message:
                'Please use a different address.',
            },
          ],
        }
        : {
          behavior: 'allow',
        };
    },
  );

  return null;
}