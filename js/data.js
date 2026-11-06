/* All showcase content lives here. Add a new entry to any list and it appears on the site. */

// icon = SVG path for a 24x24 stroke icon
const SERVICES = [
  { title: "Website & Web App Development", icon: "M3 5h18v14H3zM3 9h18M7 7h.01", desc: "Fast, phone-first websites, booking flows and dashboards, built for how you work.", details: ["Business, college and portfolio sites", "Custom tools and web apps in plain JavaScript", "Deployed on Vercel with your domain"] },
  { title: "SEO & Local SEO", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5", desc: "Get found on Google by customers in your area.", details: ["Page titles, meta and structure", "Local keywords for your city", "Sitemap and search-friendly pages"] },
  { title: "Google Business Profile Optimization", icon: "M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", desc: "A complete profile that shows up on Google Maps.", details: ["Profile setup and clean-up", "Categories, services, photos and hours", "Help with reviews and replies"] },
  { title: "Social Media Management", icon: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5", desc: "Planning, posting and a consistent look across your pages.", details: ["Content planning and posting", "Creatives for posts and stories", "One consistent brand style"] },
  { title: "Reel Shoots & Video Editing", icon: "M5 4h14v16H5zM5 9h14M5 15h14M9 4v16M15 4v16", desc: "Vertical video shot and edited for Instagram and short-form platforms.", details: ["Shot planning, filming and product or venue reels", "Cuts, music sync, captions and colour clean-up", "Delivered ready to post"] },
  { title: "Logo & Brand Identity", icon: "M12 3l9 5v8l-9 5-9-5V8zM12 8l4 2v4l-4 2-4-2v-4z", desc: "A memorable logo and a brand that looks like one thing everywhere.", details: ["Logo concepts in your brand's style", "Colour, font guidelines and graphic design", "Print-ready and web-ready files"] }
];

const DEMO_CATS = ["Business Websites", "Restaurant & Cafe", "E-commerce", "Portfolio", "Landing Pages", "Web Applications"];
/* live:true = real, deployed project (url required). live:false = concept placeholder: no url, replace later.
   img = screenshot path. Optional fields: overview, problem, approach, output, results (results only if you have real numbers). */
const DEMOS = [
  { live: true, demo: true, title: "Shahpura College Website", cat: "Business Websites", url: "https://br-mahavidhyalaya.vercel.app/", img: "assets/screens/br-mahavidhyalaya.jpg", tech: ["HTML", "CSS", "JavaScript"], desc: "Sample college website with courses, admission form, faculty, gallery and notices.", overview: "A live demo website for a higher-education college, built to show what a college site can look like.", approach: "Data-driven sections, one admission enquiry form that opens WhatsApp, and a layout that works on phones.", output: "Live demo on Vercel. Sample content, not a client project." },
  { live: true, demo: true, title: "Samarth School Website", cat: "Business Websites", url: "https://school-demo-red-five.vercel.app/", img: "assets/screens/school-demo.jpg", tech: ["HTML", "CSS", "JavaScript"], desc: "Sample school website, Nursery to Class 12, with admissions, teachers, facilities and notices.", overview: "A live demo website for a school, built to show what a school site can look like.", approach: "Class-wise academics tabs, a single admission enquiry form that opens WhatsApp, and a phone-first layout.", output: "Live demo on Vercel. Sample content, not a client project." },
  { live: true, title: "MB Cafe", cat: "Restaurant & Cafe", url: "https://mb-cafe-ten.vercel.app/", img: "assets/screens/mb-cafe.jpg", tech: ["HTML", "CSS", "JavaScript"], desc: "Open-roof coffee and fast food cafe site with menu and table booking.", output: "Live website on Vercel" },
  { live: true, title: "Thevan Garden Diaries", cat: "Restaurant & Cafe", url: "https://theaven-garden-cafe.vercel.app/", img: "assets/screens/theaven-garden-cafe.jpg", tech: ["HTML", "CSS", "JavaScript"], desc: "Garden cafe site in Jaipur with story, menu, gallery and WhatsApp table booking.", output: "Live website on Vercel" },
  { live: true, title: "Dear Moments", cat: "Web Applications", url: "https://dear-moments.in/", img: "assets/screens/dear-moments.jpg", tech: ["HTML", "CSS", "JavaScript"], desc: "Digital memory pages for proposals, weddings, birthdays and anniversaries.", output: "Live website at dear-moments.in" }
];

const LOGO_CATS = ["Minimal Logos", "Modern Logos", "Business Branding", "Creative Logos", "Typography Logos"];
/* img = path to your logo (png/svg/jpg). Leave img empty and the card shows a labelled placeholder (ph:true). */
const LOGOS = [
  // Put the logo file at assets/logos/craves.png (png, svg or jpg). Until it exists the card shows a text placeholder.
  // After adding the file, change ph: true to ph: false and write a short concept note.
  { name: "Craves", cat: "Business Branding", concept: "Logo design for Craves.", img: "assets/logos/craves.png", ph: false }
];

const CREATIVE_CATS = ["Instagram Creatives", "Reel Editing", "Cinematic Videos", "Product Shoots", "Social Media Campaigns", "Graphic Design"];
/* img = image path, video = mp4 path (optional), link = Instagram post URL (optional). */
const CREATIVES = [
  // Editing and reels live on Instagram (see the highlight cards on the site). Add entries here only for work you want shown on the page.
];
