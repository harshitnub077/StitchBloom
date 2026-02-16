import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    firstName: string;
}

export const WelcomeEmail = ({ firstName }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to CrochetVerse!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Welcome, {firstName}!</Heading>
                <Text style={text}>
                    Thank you for joining CrochetVerse. We are excited to have you on board.
                </Text>
                <Text style={text}>
                    Explore our collection of handcrafted crochet items and yarn supplies.
                </Text>
                <Text style={footer}>The CrochetVerse Team</Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const h1 = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
    textAlign: "center" as const,
};

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "26px",
};

const footer = {
    color: "#898989",
    fontSize: "14px",
    marginTop: "20px",
};
