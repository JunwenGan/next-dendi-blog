"use client";

export default function DecorativeSideBars() {
  return (
    <>
      {/* Left decorative bar */}
      <div className="absolute left-4 md:left-8 lg:left-12 top-0 bottom-40 w-[2px] pointer-events-none z-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-purple-500/60 via-50% to-transparent to-100%" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-purple-400/40 via-50% to-transparent to-100% blur-md w-2" />
      </div>

      {/* Right decorative bar */}
      <div className="absolute right-4 md:right-8 lg:right-12 top-0 bottom-40 w-[2px] pointer-events-none z-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-purple-500/60 via-50% to-transparent to-100%" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-purple-400/40 via-50% to-transparent to-100% blur-md w-2" />
      </div>
    </>
  );
}
