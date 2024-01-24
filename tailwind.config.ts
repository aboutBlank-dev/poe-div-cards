import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "div-card-bg": "url('/Divination_card_frame.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
