import type { Config } from "tailwindcss";
import sharedConfig from "@crochetverse/config/tailwind.config";

const config: Config = {
    ...sharedConfig,
    content: [
        ...(sharedConfig.content as string[]),
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
};

export default config;
