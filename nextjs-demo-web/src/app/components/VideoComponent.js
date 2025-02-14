export default function VideoComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <video 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        autoPlay 
        muted
        preload="auto"
        loop
      >
        <source src="/Logo-3-[remix].mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}