import "./../styles/gallery.css";

import React, { useState, useEffect } from "react";

function ImageCard({ image }) {
  return (
    <div className="image-card">
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
    </div>
  );
}

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTags, setSearchTags] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);

  const handleTagInputChange = (e) => {
    setSearchTags(e.target.value);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
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
  }, [searchTags, images]);

  return (
    <div className="gallery">
      <h1>Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tag"
        value={searchTags}
        onChange={handleTagInputChange}
      />
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="image-grid">
          {filteredImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
