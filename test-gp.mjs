import { extractPhotos } from 'google-photos-album-image-url-fetch';

async function testFetch() {
    try {
        const photos = await extractPhotos('https://photos.app.goo.gl/wH5EmznKKVQtVVim8');
        console.log("SUCCESS. Found photos:", photos.length);
        if (photos.length > 0) {
            console.log("Sample URL:", photos[0].url);
        }
    } catch (e) {
        console.error('Failed', e);
    }
}

testFetch();
