import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "div-card-bg": "url('/Divination_card_frame.png')",
      },
      colors: {
        darkBrown: "#2b1d10",
        lightBrown: "#3C2A21",
        beige: "#D5CEA3",
        vanilla: "#E5E5CB",
      },
    },
  },
  plugins: [],
} satisfies Config;
