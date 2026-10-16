const v = (n) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: { extend: {
    colors: { bg: v("bg"), surface: v("surface"), elevated: v("elevated"), line: v("line"), fg: v("fg"), sub: v("sub"), muted: v("muted"), accent: v("accent") },
    fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
  } },
};
