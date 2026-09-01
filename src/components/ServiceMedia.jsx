export default function ServiceMedia({ service, className = '' }) {
  if (service.video) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={service.image}
      >
        <source src={service.video} type="video/mp4" />
      </video>
    )
  }
  return <img className={className} src={service.image} alt={service.title} />
}
