const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="items-center justify-center hidden p-12 lg:flex bg-base-200">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""
                }`}></div>
          ))}
        </div>
        <h2 className="mb-4 font-bold text-2x1">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;