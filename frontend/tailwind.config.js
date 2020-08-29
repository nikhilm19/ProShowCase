console.log(process.env.NODE_ENV);
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production" ? true : false,
    content: ["./src/**/*.js", "./src/**/*.html", "./src/**/*.jsx"],
  },
  theme: {
    extend: {
      "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
    },
    fontFamily: {
      sans: ["-apple-system", "BlinkMacSystemFont"],
      serif: ["Georgia", "Cambria"],
      mono: ["SFMono-Regular", "Menlo"],
      display: ["Roboto Slab", "IBM Plex Sans"],
      body: ["Open Sans"],
      title: ["Rubik"],
      buttons: ["Heebo"],
    },
    animations: {
      // defaults to {}; the following are examples
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },

      fadeInUp: {
        "0%": {
          opacity: 0,
          transform: "translateY(20px)",
        },

        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      jump: {
        "0%": {
          transform: "translateY(0%)",
        },
        "50%": {
          transform: "translateY(-100%)",
        },
        "100%": {
          transform: "translateY(0%)",
        },
      },
    },
    animationDuration: {
      // defaults to these values
      default: "1s",
      "0s": "0s",
      "1s": "1s",
      "2s": "2s",
      "3s": "3s",
      "4s": "4s",
      "5s": "5s",
    },
    animationTimingFunction: {
      // defaults to these values
      default: "ease",
      linear: "linear",
      ease: "ease",
      "ease-in": "ease-in",
      "ease-out": "ease-out",
      "ease-in-out": "ease-in-out",
    },
    animationDelay: {
      // defaults to these values
      default: "0s",
      "0s": "0s",
      "1s": "1s",
      "2s": "2s",
      "3s": "3s",
      "4s": "4s",
      "5s": "5s",
    },
    animationIterationCount: {
      // defaults to these values
      default: "1",
      once: "1",
      infinite: "infinite",
    },
    animationDirection: {
      // defaults to these values
      default: "normal",
      normal: "normal",
      reverse: "reverse",
      alternate: "alternate",
      "alternate-reverse": "alternate-reverse",
    },
    animationFillMode: {
      // defaults to these values
      default: "none",
      none: "none",
      forwards: "forwards",
      backwards: "backwards",
      both: "both",
    },
    animationPlayState: {
      // defaults to these values
      running: "running",
      paused: "paused",
    },
  },
  variants: {
    // all the following default to ['responsive']
    textColor: ["responsive", "hover", "focus", "group-hover"],
    animations: ["responsive"],
    animationDuration: ["responsive"],
    animationTimingFunction: ["responsive"],
    animationDelay: ["responsive"],
    animationIterationCount: ["responsive"],
    animationDirection: ["responsive"],
    animationFillMode: ["responsive"],
    animationPlayState: ["responsive"],
  },
  plugins: [require("tailwindcss-animations")],
};
