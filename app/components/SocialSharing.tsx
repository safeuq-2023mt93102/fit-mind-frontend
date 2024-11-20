"use client"


  interface SocialSharingProps {
    shareMessage: string; // Define the expected prop type
  }
  
  const SocialSharing: React.FC<SocialSharingProps> = ({ shareMessage }) => {
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: "My Fitness Progress",
          text: shareMessage,
          url: "https://your-app-link.com", // Optional: Add your app's URL
        })
          .then(() => console.log("Progress shared successfully!"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        alert("Sharing not supported on this device.");
      }
    };
  
    return (
      <button
        onClick={handleShare}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Share Your Progress
      </button>
    );
  };

export default SocialSharing;