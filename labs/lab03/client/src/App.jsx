import { useState, useEffect } from "react";

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Shared File Upload Handler
  const uploadFiles = async (url, formData) => {
    try {
      setIsLoading(true); // Set loading state true during file upload
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "File upload failed");
      }
      setMessage("File(s) uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error uploading file(s).");
    } finally {
      setIsLoading(false); // Set loading state false after upload completes
    }
  };

  // Handlers for Single File
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const fetchSingleFile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
      setMessage("Failed to fetch file.");
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

  // Handlers for Multiple Files
  const handleMultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const handleSubmitMultipleFiles = (e) => {
    e.preventDefault();
    if (multipleFiles.length === 0) {
      setMessage("Please select files before uploading.");
      return;
    }

    const formData = new FormData();
    Array.from(multipleFiles).forEach((file) => {
      formData.append("files", file);
    });
    uploadFiles("http://localhost:8000/save/multiple", formData);
  };

  // Fetch Dog Image
  const fetchDogImage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
      setMessage("Failed to fetch dog image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Message Display */}
      <p aria-live="assertive">{message}</p>

      {/* Top-left Buttons */}
      <div className="button-container">
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        <button onClick={fetchDogImage}>Fetch Dog Image</button>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      {/* Display Image */}
      {displayImage && (
        <div>
          <h3>Display Image</h3>
          <img src={displayImage} alt="Fetched content" className="image-display" />
        </div>
      )}

      {/* Single File Upload Form */}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit" disabled={isLoading}>Upload Single File</button>
      </form>

      {/* Multiple File Upload Form */}
      <form onSubmit={handleSubmitMultipleFiles}>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFileChange} />
        <button type="submit" disabled={isLoading}>Upload Multiple Files</button>
      </form>

      {/* Loading Indicator */}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default App;
