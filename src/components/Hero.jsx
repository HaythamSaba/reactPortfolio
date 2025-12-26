import { motion } from "framer-motion";
import Header from "./Header";
function Hero() {
  return (
    <div className="relative overflow-clip min-h-screen text-textColor bg-[linear-gradient(to_bottom,_#161b22,_#82e0aa_85%)] flex items-center justify-center template">
      {" "}
      <div className="absolute bg-darkBackground w-[2400px] h-[1000px] rounded-[50%] left-1/2 -translate-x-1/2 bg-[radial-gradient(closest-side,#161b22_80%,#82e0aa)] top-[450px] border-[1px] border-[#82e0aa]/30"></div>{" "}
      <div className="container relative mx-auto pb-24">
        {" "}
        <Header />{" "}
        <div className="sticky top-0 flex flex-col items-center justify-center text-center z-10 mt-4 ">
          {" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative mb-4 mt-8 flex items-center justify-center flex-col gap-4"
          >
            {" "}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-primary-500 to-transparent rounded-full blur-3xl"></div> */}{" "}
            <img src="newImg.png" className="w-[150px] relative z-10" alt="MY IMAGE" />
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            {" "}
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
              {" "}
              Hello, I am{" "}
              <span className="text-secondary-400">
                {" "}
                <br /> Haytham{" "}
              </span>{" "}
              Saba{" "}
            </h1>{" "}
            <p className="text-xl mt-4 text-[#e5e7eb]">
              {" "}
              A passionate front-end developer with a love for creating
              beautiful and functional web applications.{" "}
            </p>{" "}
          </motion.div>{" "}
          <div className="flex mt-8 gap-4">
            {" "}
            <motion.button
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f0e7db",
                color: "#5b460b",
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                backgroundColor: "#0d1117",
                transition: { duration: 0.2 },
              }}
              className="px-6 py-3 bg-primary-500 text-textColor rounded-full shadow-lg outline-none"
            >
              {" "}
              Contact Me{" "}
            </motion.button>{" "}
            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f7dc6f",
                color: "#0d1117",
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                backgroundColor: "#eac42b",
                transition: { duration: 0.2 },
              }}
              className="px-6 py-3 bg-transparent border border-secondary-400 text-background rounded-full shadow-lg outline-none"
            >
              {" "}
              View Projects{" "}
            </motion.button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default Hero;
