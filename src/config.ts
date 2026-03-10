// =============================================
// Wedding Configuration
// Update these values with your actual details!
// =============================================

// =============================================
// Wedding Configuration (Static Fallback)
// =============================================

export const DEFAULT_CONFIG = {
    // Couple Names
    bride: 'Mamatha',
    groom: 'Jagadeesh',

    // Wedding Date — Update this to your exact date & time
    weddingDate: new Date('2026-03-25T09:00:00'),

    // Live Stream unlock date (same as wedding day)
    liveStreamDate: new Date('2026-03-25T08:00:00'),
    liveStreamUrl: '',

    // Wedding Hashtag
    hashtag: '#JagadeeshWedsMamatha2026',

    // Venue Details
    venue: {
        name: 'GR Convention',
        address: 'Hasakothur, Telangana',
        rsvpUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdKB8...", // Replace with your Google Form
        galleryPlaceholders: [
            { emoji: '🌸', label: 'Floral Dreams' },
            { emoji: '🪷', label: 'Lotus Blessings' },
            { emoji: '✨', label: 'Golden Moments' },
            { emoji: '💍', label: 'Ring Ceremony' },
            { emoji: '🌺', label: 'Marigold Magic' },
            { emoji: '🎊', label: 'Celebrations' },
            { emoji: '🪔', label: 'Divine Light' },
            { emoji: '💐', label: 'Bouquet' },
            { emoji: '🎶', label: 'Musical Night' },
        ],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d78.5176141!3d18.8005382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcda3df6a9a83f3%3A0x652f99e54b28895e!2sGR%20Convention%20Hasakothur!5e0!3m2!1sen!2sin!4v1697001234567!5m2!1sen!2sin',
        mapsLink: 'https://maps.app.goo.gl/hzLZzwBPmGpsAMhs8',
    },

    // Events Schedule
    events: [
        {
            emoji: '💍',
            name: 'Engagement',
            date: 'March 22, 2026',
            time: '9:30 AM',
            venue: 'GR Convention',
            description: 'The ring ceremony where the couple formally exchange rings and vow to spend their lives together.',
            dressCode: 'Semi-Formal / Elegant Ethnic',
            dressColor: '#C94C6C',
        },
        {
            emoji: '🌿',
            name: 'Mehendi',
            date: 'March 23, 2026',
            time: '6:00 PM',
            venue: 'GR Convention',
            description: 'An evening of beautiful henna art, music, and celebration. Get your hands adorned with intricate mehendi designs!',
            dressCode: 'Green / Floral Outfits',
            dressColor: '#2D6A4F',
        },
        {
            emoji: '💃',
            name: 'Sangeet',
            date: 'March 23, 2026',
            time: '7:00 PM',
            venue: 'GR Convention',
            description: 'A vibrant night of music, dance performances, and unforgettable memories. Bring your dancing shoes!',
            dressCode: 'Glamorous / Bollywood Theme',
            dressColor: '#E8963A',
        },
        {
            emoji: '👰',
            name: 'Pellikuthuru & Pellikoduku',
            date: 'March 24, 2026',
            time: '7:00 PM',
            venue: 'GR Convention',
            description: 'The traditional Telugu ceremony of making the bride (Pellikuthuru) and groom (Pellikoduku) ready for the wedding with rituals and blessings.',
            dressCode: 'Traditional Telugu Attire',
            dressColor: '#E85D75',
        },
        {
            emoji: '💛',
            name: 'Haldi',
            date: 'March 24, 2026',
            time: '11:00 AM',
            venue: 'GR Convention',
            description: 'The auspicious turmeric ceremony — smear the bride and groom with haldi paste for blessings and glowing skin!',
            dressCode: 'Yellow / White Outfits',
            dressColor: '#F5C542',
        },
        {
            emoji: '🙏',
            name: 'Wedding Ceremony',
            date: 'March 25, 2026',
            time: '9:00 AM',
            venue: 'GR Convention Mandap',
            description: 'The sacred wedding ceremony with traditional rituals, mangalsutra, and tying of the sacred knot. The most beautiful moment!',
            dressCode: 'Traditional Wedding Attire',
            dressColor: '#8B1A2B',
        },
    ],

    // Our Story Timeline
    story: [
        {
            date: 'May 2025',
            title: 'Families Connected',
            description: 'Our families found each other and felt a connection was meant to be. Horoscopes matched, and conversations began between the elders.',
        },
        {
            date: 'May 21, 2025',
            title: 'First Meeting',
            description: 'Jagadeesh and Mamatha met for the first time. What started with nervous smiles quickly turned into an easy, warm conversation — it just felt right.',
        },
        {
            date: 'June 1, 2025',
            title: 'Families Said Yes!',
            description: 'Both families happily agreed — it was official! Two families came together with blessings, joy, and the promise of a beautiful future.',
        },
        {
            date: 'March 22, 2026',
            title: 'Engagement',
            description: 'Rings exchanged, smiles shared, and a lifelong commitment sealed at GR Convention, surrounded by loved ones.',
        },
        {
            date: 'March 25, 2026',
            title: 'The Wedding 💍',
            description: "And now, we invite you to celebrate as we tie the sacred knot. Here's to love, family, and happily ever after!",
        },
    ],

    // Family
    brideFamily: [
        { name: 'Jadala Santhosh', relation: 'Father of the Bride', emoji: '👨' },
        { name: 'Jadala Gangamani', relation: 'Mother of the Bride', emoji: '👩' },
        { name: 'Jadala Swarna', relation: 'Sister', emoji: '👧' },
    ],
    groomFamily: [
        { name: 'Baddam Shankar', relation: 'Father of the Groom', emoji: '👨' },
        { name: 'Late Baddam Lingu', relation: 'Mother of the Groom', emoji: '🕊️' },
        { name: 'Baddam Swathi', relation: 'Sister', emoji: '👧' },
        { name: 'Baddam Radhika', relation: 'Sister', emoji: '👧' },
    ],
};

// Mutable config that will be updated from API
export let WEDDING_CONFIG = { ...DEFAULT_CONFIG };

export async function fetchConfig() {
    try {
        const response = await fetch('/api/content');
        if (response.ok) {
            const data = await response.json();
            if (data && Object.keys(data).length > 0) {
                // Parse dates back to Date objects
                if (data.weddingDate) data.weddingDate = new Date(data.weddingDate);
                if (data.liveStreamDate) data.liveStreamDate = new Date(data.liveStreamDate);
                WEDDING_CONFIG = { ...DEFAULT_CONFIG, ...data };
                return WEDDING_CONFIG;
            }
        }
    } catch (error) {
        console.warn('Failed to fetch dynamic config, using static defaults:', error);
    }
    return DEFAULT_CONFIG;
}
