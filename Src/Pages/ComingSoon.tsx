import React from "react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 px-4">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <span className="text-6xl mb-4">🚧</span>
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">Coming Soon</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">The ERP Login page is under construction.<br />Please check back soon!</p>
        <a href="/" className="mt-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 transition">Go to Home</a>
      </div>
    </div>
  );
};

export default ComingSoon;
