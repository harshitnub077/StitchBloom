import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Button,
} from "@react-email/components";
import * as React from "react";

interface ShippingNotificationEmailProps {
    orderId: string;
    trackingNumber?: string;
    customerName: string;
}

export const ShippingNotificationEmail = ({ orderId, trackingNumber, customerName }: ShippingNotificationEmailProps) => (
    <Html>
        <Head />
        <Preview>Your order #{orderId} has shipped!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Good news, {customerName}!</Heading>
                <Text style={text}>
                    Your order <strong>#{orderId}</strong> has been shipped and is on its way.
                </Text>
                {trackingNumber && (
                    <Text style={text}>
                        Tracking Number: <strong>{trackingNumber}</strong>
                    </Text>
                )}
                <Button
                    href={`https://crochetverse.com/dashboard/orders/${orderId}`} // Replace with actual URL
                    style={button}
                >
                    View Order
                </Button>
                <Text style={footer}>The CrochetVerse Team</Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#ffffff",
    fontFamily: 'sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
};

const text = {
    fontSize: "16px",
    color: "#333",
    marginBottom: "20px",
};

const button = {
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center" as const,
};

const footer = {
    color: "#898989",
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center" as const,
};
