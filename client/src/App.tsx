import {Navbar} from "./components/Navbar/Navbar";

import {Hero} from "./components/Hero/Hero";

import About from "./components/About/About";

import Skills from "./components/Skills/Skills";

import Projects from "./components/Projects/Projects";

import Certificates from "./components/Certificates/Certificates";

import Contact from "./components/Contact/Contact";

import {Footer} from "./components/Footer/Footer";

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden

        bg-[#0B1120]

        text-white
      "
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none

          fixed
          inset-0

          -z-10
          overflow-hidden
        "
      >
        {/* top glow */}
        <div
          className="
            absolute
            -top-50
            -left-50

            h-125
            w-125

            rounded-full

            bg-cyan-500/10

            blur-[120px]
          "
        />

        {/* bottom glow */}
        <div
          className="
            absolute
            -bottom-50
            -right-50

            h-125
            w-125

            rounded-full

            bg-blue-500/10

            blur-[120px]
          "
        />

        {/* center glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/3

            h-100
            w-100

            -translate-x-1/2

            rounded-full

            bg-sky-400/5

            blur-[120px]
          "
        />
      </div>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="relative z-10">

        <Hero />

        <About />

        <Skills />

        <Projects />

        <Certificates />

        <Contact />

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </div>
  );
}

export default App;