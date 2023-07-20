import React, {useEffect, useState} from 'react';
import {
  render,
  Banner,
  useBuyerJourneyIntercept,
  useTarget,
  useShippingAddress,
} from '@shopify/checkout-ui-extensions-react';

render(
  'Checkout::CartLineDetails::RenderAfter',
  () => <Extension />,
);



function Extension() {
  const [showError, setShowError] = useState(false);
  const [inventory, setInventory] = useState();

  const {id, quantity} = useTarget();
  const address = useShippingAddress();

  const requestBody = { "state":address?.provinceCode,"productVariants":[{"quantity":1,"variantId":37815774937280,"productId":6132203847872,"giftCard":false,"handle":"forget-me-not-little-bluebird-seed","productType":"Flower Seed","bundleProductVariantIds":null,"title":"Forget Me Not Little Bluebird","sku":"19577","gwp":false,"tags":["april_cool","april_sub-tropical","april_temperate","Autumn","Blue","Cool","december_cool","F","february_cool","february_temperate","Flowers","Forget Me Not","Full Sun","Garden Beds","january_cool","january_temperate","march_cool","march_sub-tropical","march_temperate","may_sub-tropical","may_temperate","Part Shade","Pots","Pots and Garden beds","Sub-Tropical","Summer","Temperate"],"applyForFirstOrder":false,"applyForStaffOnly":false,"isGWP":false}],"subtotalPrice":"4.20" }

  useEffect(() => {
    fetch(`https://digital-uat-yatesshopinventory-func.azurewebsites.net/api/ValidateStock`, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then((inventoryResult) => {
        console.log("Inventory result: ");
        console.log(inventoryResult);
        setInventory(inventoryResult);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });
  }, [address?.provinceCode]);

  useBuyerJourneyIntercept(
    ({canBlockProgress}) => {

      productVarian = inventory?.productVariants.filter(pv => pv.variantId === 37815774937280)[0];

      console.log("Inventory result: ");
      console.log(productVarian);
      
      return canBlockProgress && (!productVarian || productVarian.isOutOfStock === true || productVarian.quantityAvailable === 0)
        ? {
            behavior: 'block',
            reason: 'limited stock',
            perform: (result) => {
              if (result.behavior === 'block') {
                setShowError(true);
              }
            },
          }
        : {
            behavior: 'allow',
            perform: () => {
              setShowError(false);
            },
          };
    },
  );

  return showError ? (
    <Banner>
      This item has a limit of one per customer.
    </Banner>
  ) : null;
}
