import { useState, useEffect } from "react";

export default function ImageSlider({ url, limit }) {
  const [images, setImages] = useState([]);
  const [cuurentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const responce = await fetch(getUrl);
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages();
  }, [url]);

  if (loading) {
    return <diV>Loading data!</diV>;
  }
  if (errorMsg !== null) {
    return <div>Error occured {errorMsg}</div>;
  }

  return <div className="container"></div>;
}
