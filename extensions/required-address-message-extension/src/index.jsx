import React from 'react';
import {
  render,
  Text,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  return (
    <Text size="base" appearance="critical">
      Enter your address details BEFORE clicking on Continue to shipping to check stock availability
    </Text>
  );
}