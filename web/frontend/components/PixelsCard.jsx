import { Card, TextContainer } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { useState } from "react";

export function PixelsCard() {
  const emptyToastProps = { content: null };
  const fetch = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  
  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/pixels/create");

    if (response.ok) {
      setToastProps({
        content: "Pixel is created",
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error when creating pixel",
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title="Pixel Registration"
        sectioned
        primaryFooterAction={{
          content: "Register Pixel",
          onAction: handlePopulate,
        }}
      >
        <TextContainer spacing="loose">
          <p>Register Pixel</p>
        </TextContainer>
      </Card>
    </>
  );
}
