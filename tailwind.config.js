module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
    "./layouts/**/*.js",
    "./views/**/*.js",
  ],
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [require("@tailwindcss/forms")],
};
