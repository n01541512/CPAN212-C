import { useState, useEffect } from "react";

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [dogImages, setDogImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const handleMultipleFileChange = (e) => {
    setMultipleFiles(Array.from(e.target.files));
  };

  const uploadFiles = async (url, formData) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, { method: "POST", body: formData });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        throw new Error(data?.error || "Upload failed");
      }

      setMessage("File(s) uploaded successfully!");
      setSingleFile(null);
      setMultipleFiles([]);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Error uploading file(s).");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSingleFile = (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", singleFile);
    uploadFiles("http://localhost:8000/save/single", formData);
  };

  const handleSubmitMultipleFiles = (e) => {
    e.preventDefault();
    if (multipleFiles.length === 0) {
      setMessage("Please select files before uploading.");
      return;
    }

    const formData = new FormData();
    multipleFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    uploadFiles("http://localhost:8000/save/multiple", formData);
  };

  const fetchMultipleFiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const data = await response.json();

      if (!response.ok || !data.files) {
        throw new Error("Failed to fetch files");
      }

      const fileUrls = data.files.map((file) => {
        return `http://localhost:8000/file/${file}`;
      });

      setDisplayImage(fileUrls); 
    } catch (error) {
      console.error("Error fetching files:", error);
      setMessage("Failed to fetch files.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDogImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/image/random/3");
      const data = await response.json();

      if (!response.ok || !data.message) {
        throw new Error("Failed to fetch dog images");
      }

      setDogImages(data.message);
    } catch (error) {
      console.error("Dog Image Fetch Error:", error);
      setMessage("Failed to fetch dog images.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (displayImage) URL.revokeObjectURL(displayImage);
    };
  }, [displayImage]);

  return (
    <div className="container">
      <p aria-live="assertive">{message}</p>

      <div className="button-container">
        <button onClick={fetchMultipleFiles} disabled={isLoading}>
          Fetch Random Files
        </button>
        <button onClick={fetchDogImages} disabled={isLoading}>
          Fetch Dog Images
        </button>
      </div>

      {displayImage && (
        <div>
          <h3>Display Random Images</h3>
          <div className="image-container">
            {displayImage.map((image, index) => (
              <img key={index} src={image} alt={`Fetched content ${index + 1}`} className="image-display" />
            ))}
          </div>
        </div>
      )}

      {dogImages.length > 0 && (
        <div>
          <h3>Dog Images</h3>
          <div className="image-container">
            {dogImages.map((image, index) => (
              <img key={index} src={image} alt={`Dog Image ${index + 1}`} className="image-display" />
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit" disabled={isLoading}>Upload Single File</button>
      </form>

      <form onSubmit={handleSubmitMultipleFiles}>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFileChange} />
        <button type="submit" disabled={isLoading}>Upload Multiple Files</button>
      </form>

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default App;
