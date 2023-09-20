import React, { useState, useEffect } from "react";

function ImageCard({ image, index, onDragStart, onDragOver, onDrop }) {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function fetchImageData() {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=25872291-f20fe8f2ed821c6a1ed214f86&id=${image.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTimeout(() => {
          setImageData(data.hits || []);
          setLoading(false); // Transition loading to false after data is fetched
        }, 2000);
      } catch (error) {
        console.error("Error fetching image data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImageData();
  }, [image.id]);

  return (
    <div
      className={`image-card ${loading ? "skeleton-card" : ""}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, index)}
    >
      {loading ? (
        <div className="skeleton-loader"></div>
      ) : imageData ? (
        <>
          <img src={imageData.webformatURL} alt={imageData.tags} />
          <div className="image-details">
            <div className="tags">
              {imageData.tags.split(",").map((tag) => (
                <span key={tag.trim()} className="tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
            <p className="description">{imageData.type}</p>
          </div>
        </>
      ) : (
        <p>Error loading image</p>
      )}
    </div>
  );
}

export default ImageCard;
