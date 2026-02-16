import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Text,
    Section,
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";
import { formatPrice } from "@crochetverse/shared";

interface OrderConfirmationEmailProps {
    orderId: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
}

export const OrderConfirmationEmail = ({ orderId, items, total }: OrderConfirmationEmailProps) => (
    <Html>
        <Head />
        <Preview>Order Confirmation #{orderId}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Thank you for your order!</Heading>
                <Text style={text}>Order ID: {orderId}</Text>
                <Hr />
                <Section>
                    {items.map((item, index) => (
                        <Row key={index} style={{ marginBottom: "10px" }}>
                            <Column>
                                <Text style={itemText}>{item.name} x {item.quantity}</Text>
                            </Column>
                            <Column align="right">
                                <Text style={itemText}>{formatPrice(item.price * item.quantity)}</Text>
                            </Column>
                        </Row>
                    ))}
                </Section>
                <Hr />
                <Section>
                    <Row>
                        <Column>
                            <Text style={{ ...text, fontWeight: "bold" }}>Total</Text>
                        </Column>
                        <Column align="right">
                            <Text style={{ ...text, fontWeight: "bold" }}>{formatPrice(total)}</Text>
                        </Column>
                    </Row>
                </Section>
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
    maxWidth: "580px",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
};

const text = {
    fontSize: "16px",
    color: "#333",
};

const itemText = {
    fontSize: "14px",
    color: "#555",
    margin: "0",
};

const footer = {
    color: "#898989",
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center" as const,
};
