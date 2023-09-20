import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./../firebase";
import "./../styles/gallery.css";
import React, { useState, useEffect } from "react";

function ImageCard({ image, index, onDragStart, onDragOver, onDrop, loading }) {
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
      ) : (
        <>
          <img src={image.webformatURL} alt={image.tags} />
          <div className="image-details">
            <div className="tags">
              {image.tags.split(",").map((tag) => (
                <span key={tag.trim()} className="tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
            <p className="description">{image.type}</p>
          </div>
        </>
      )}
    </div>
  );
}

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTags, setSearchTags] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);
  const container = `container ${loading ? "skeleton-loader" : "image-grid"}`;

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  const handleTagInputChange = (e) => {
    setSearchTags(e.target.value);
  };

  const handleDragStart = (e, index) => {
    setDraggedImageIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    if (draggedImageIndex === null) {
      return;
    }

    const updatedImages = [...filteredImages];
    const draggedImage = updatedImages[draggedImageIndex];
    updatedImages.splice(draggedImageIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);

    setFilteredImages(updatedImages);
    setDraggedImageIndex(null);
  };

  useEffect(() => {
    async function fetchImagesFromApi() {
      setLoading(true);

      try {
        const response = await fetch(
          "https://pixabay.com/api/?key=25872291-f20fe8f2ed821c6a1ed214f86&q"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setImages(data.hits || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImagesFromApi();
  }, [searchTags]);

  useEffect(() => {
    const filtered = images.filter((image) =>
      image.tags.toLowerCase().includes(searchTags.toLowerCase())
    );

    setFilteredImages(filtered);
    setLoading(false);
  }, [searchTags, images]);

  return (
    <div className="gallery">
      <div className="nav">
        <p className="logo">
          re<span>Drag</span>
        </p>
        <h1>Image Gallery</h1>
        <p className="logout" onClick={handleLogout}>
          LogOut
        </p>
      </div>
      <input
        type="text"
        placeholder="Search by tag"
        value={searchTags}
        onChange={handleTagInputChange}
      />
      {loading ? (
        <div className="loader">
          <div className="skeleton-loader"></div>
          <div className="skeleton-loader"></div>
          <div className="skeleton-loader"></div>
        </div>
      ) : (
        <div className="image-grid">
          {filteredImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              index={index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
