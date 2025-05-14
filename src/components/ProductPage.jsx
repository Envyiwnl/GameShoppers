import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const { state } = useLocation();
  const { id, title, description, rating, image } = state || {};
  const [screenshots, setScreenshots] = useState([]);
  const [mainImage, setMainImage] = useState(image);
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();

  const handleBuyNow = () => {
  const gameItem = { id, title, description, rating, image };
  navigate("/payment", { state: { gameItem } });
};

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/game?id=${id}`);
        const data = await res.json();
        const fetchImages = data?.screenshots?.map((s) => s.image) || [];

        const uniqueImages = [image, ...fetchImages.filter((img) => img !== image)];
        setScreenshots(uniqueImages);
        setMainImage(uniqueImages[0]);
      } catch (err) {
        console.error("Failed to fetch game details:", err);
      }
    };

    if (id) fetchGameDetails();
  }, [id]);

  const scrollThumbnails = (direction) => {
    const container = thumbnailRef.current;
    const currentIndex = screenshots.findIndex((img) => img === mainImage);
  
    let newIndex = currentIndex;
    if (direction === "left") {
      newIndex = Math.max(currentIndex - 1, 0);
    } else {
      newIndex = Math.min(currentIndex + 1, screenshots.length - 1);
    }
  
    const scrollAmount = 100;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  
    setMainImage(screenshots[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white p-6 md:p-12 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        {mainImage && (
          <motion.img
            src={mainImage}
            alt="Main"
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="relative flex items-center gap-2 w-full overflow-hidden">
          <button
            onClick={() => scrollThumbnails("left")}
            className="text-2xl px-2 hover:text-yellow-400"
          >
            ◀
          </button>

          <div
            ref={thumbnailRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide"
          >
            {screenshots.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setMainImage(img)}
                className={`h-30 w-48 object-cover rounded-md cursor-pointer transition 
                ${mainImage === img ? "ring-2 ring-yellow-400" : "opacity-70 hover:opacity-100"}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollThumbnails("right")}
            className="text-2xl px-2 hover:text-yellow-400"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-yellow-400 text-lg font-semibold">⭐ {rating}</p>
            </div>

            <div className="space-y-4 mb-28">  
                <p className="text-gray-300">{description}</p>
                <button 
                    className="text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition"
                    onClick={handleBuyNow}
                >
                Buy Now
                </button>
            </div>
        </div>
    </div>
  );
}

export default ProductPage;