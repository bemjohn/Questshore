export default function SiteHero({
  backgroundImage,
  mobileBackgroundImage,
  overlayOpacity = 40,
  title,
  subtitle,
  accentText,
  children,
}) {
  const overlayStyle = {
    backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})`,
  };

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
      {mobileBackgroundImage ? (
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileBackgroundImage} />
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </picture>
      ) : (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      <div className="absolute inset-0 z-10" style={overlayStyle}></div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-16 text-center">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            {title}
            {accentText && (
              <>
                <br />
                <span className="text-cyan-300">{accentText}</span>
              </>
            )}
          </h1>
        )}
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
