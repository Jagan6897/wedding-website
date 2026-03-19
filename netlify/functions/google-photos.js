import { fetchImageUrls } from 'google-photos-album-image-url-fetch';

export const handler = async (event, context) => {
    try {
        const albumUrl = 'https://photos.app.goo.gl/wH5EmznKKVQtVVim8';
        const urls = await fetchImageUrls(albumUrl);
        
        // Transform standard URLs into an array of objects for the frontend
        const images = urls.map((obj, i) => {
            // obj might be { url, width, height }
            return {
                id: `gp-${i}`,
                data: obj.url,
                caption: '',
                category: 'gallery' // to match existing expectations
            };
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(images)
        };
    } catch (error) {
        console.error('Error fetching Google Photos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch album photos' })
        };
    }
};
