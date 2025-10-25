import { useState, useEffect } from "react";
import ImageCarousel from "./components/ImageCarousel.jsx";

export default function App() {
    const [images, setImages] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchImages = async () => {
        setFetching(true);
        const resp = await fetch("https://picsum.photos/v2/list?page=1&limit=10");
        const data = await resp.json();

        let fetchedImages = [];
        data.forEach((d) => {
            const obj = {
                id: d.id,
                src: d.download_url,
                alt: d.author,
            };

            fetchedImages.push(obj);
        });
        setImages(fetchedImages);
        setFetching(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    /**
     * Show loading when images are getting fetched
     */
    if (fetching) {
        return <div>loading... </div>;
    }

    return (
        <div className="App">
            <ImageCarousel
                images={images}
                isAutoPlayOn={false}
                duration={3}
                loop={true}
            />
        </div>
    );
}

/**
 * 1) Create an image carousel component.
 * a) To fetch images, use this API - https://picsum.photos/v2/list?page=1&limit=10
 * (The API returns a list of objects, each of which has a download_url property that contains the URL of an image.)
 * b) Following should be configurable
 *    i) Number of images to Show
 *    ii) Loop (Boolean)
 *    iii) Autoplay, Autoplay Speed
 * c) Component should be responsive.
 * d) Sliding transition between slides
 * e) Multiple aspect ratios and portrait and landscape images (an Aspect ratio should be preserved)
 */
