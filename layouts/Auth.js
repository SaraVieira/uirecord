import React from "react";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen bg-gray-50">
          {children}
        </section>
      </main>
    </>
  );
}
