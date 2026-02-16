import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
    orderId: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
}

export const OrderConfirmationEmail = ({
    orderId,
    items,
    total,
}: OrderConfirmationEmailProps) => (
    <Html>
        <Head />
        <Preview>Order Confirmation #{orderId.slice(0, 8)}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Order Confirmation</Heading>
                <Text style={text}>
                    Thank you for your order! Your order ID is <strong>{orderId}</strong>.
                </Text>
                <Hr style={hr} />
                <Section>
                    {items.map((item, index) => (
                        <Row key={index} style={{ marginBottom: "10px" }}>
                            <Column>
                                <Text style={itemText}>
                                    {item.name} x {item.quantity}
                                </Text>
                            </Column>
                            <Column align="right">
                                <Text style={itemText}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Text>
                            </Column>
                        </Row>
                    ))}
                </Section>
                <Hr style={hr} />
                <Section>
                    <Row>
                        <Column>
                            <Text style={totalText}>Total</Text>
                        </Column>
                        <Column align="right">
                            <Text style={totalText}>${total.toFixed(2)}</Text>
                        </Column>
                    </Row>
                </Section>
                <Hr style={hr} />
                <Text style={footer}>
                    Need help? <Link href="mailto:support@crochetverse.com">Contact Support</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#ffffff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "560px",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.1",
    margin: "0 0 20px 0",
};

const text = {
    fontSize: "16px",
    lineHeight: "1.4",
    margin: "0 0 20px 0",
    color: "#484848",
};

const itemText = {
    fontSize: "14px",
    lineHeight: "1.4",
    margin: "0",
    color: "#484848",
};

const totalText = {
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "1.4",
    margin: "0",
    color: "#484848",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#9ca299",
    fontSize: "14px",
    marginBottom: "10px",
};

export default OrderConfirmationEmail;
