import { motion } from "framer-motion";

function ProfileRing({ children }) {
  return (
    <div className="relative flex items-center justify-center w-[170px] h-[170px]">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid rgba(130,224,170,0.25)",
          boxShadow: "0 0 20px rgba(130,224,170,0.08)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
          style={{
            backgroundColor: "#82e0aa",
            boxShadow: "0 0 8px #82e0aa, 0 0 20px #82e0aa",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute rounded-full"
        style={{ inset: 10, border: "1px dashed rgba(247,220,111,0.2)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.img
        src="mainLogo.webp"
        alt="Haytham"
        className="w-[130px] relative z-10 mt-4"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default ProfileRing;