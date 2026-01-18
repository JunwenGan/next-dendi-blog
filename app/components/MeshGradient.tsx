"use client";

const MeshGradient = () => {
  return (
    <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Blob 1 - Top Left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[50px] will-change-transform animate-blob-1"
        style={{
          background: "radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)",
        }}
      />

      {/* Blob 2 - Top Right */}
      <div
        className="absolute right-0 w-[500px] h-[500px] rounded-full blur-[45px] will-change-transform animate-blob-2"
        style={{
          background: "radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)",
        }}
      />

      {/* Blob 3 - Center */}
      <div
        className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full blur-[55px] will-change-transform animate-blob-3"
        style={{
          background: "radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)",
        }}
      />

      {/* Blob 4 - Bottom Left */}
      <div
        className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full blur-[45px] will-change-transform animate-blob-4"
        style={{
          background: "radial-gradient(circle, var(--aurora-4) 0%, transparent 70%)",
        }}
      />

      {/* Blob 5 - Bottom Right */}
      <div
        className="absolute bottom-0 right-0 w-[650px] h-[650px] rounded-full blur-[50px] will-change-transform animate-blob-5"
        style={{
          background: "radial-gradient(circle, var(--aurora-5) 0%, transparent 70%)",
        }}
      />

      {/* Blob 6 - Middle Right */}
      <div
        className="absolute top-1/2 right-1/4 w-[480px] h-[480px] rounded-full blur-[40px] will-change-transform animate-blob-6"
        style={{
          background: "radial-gradient(circle, var(--aurora-6) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default MeshGradient;
