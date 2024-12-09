import React, { useState } from "react";
import Header from "../components/Header/Header";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-teal-400 text-white">
      <Header />
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        We're working hard to bring something amazing! Stay tuned.
      </p>
      <footer className="absolute bottom-4 text-sm opacity-75">
        &copy; 2024 MindMate. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;
