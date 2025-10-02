# SkyView Drone Photography Website

A modern, professional website for a real estate drone photography business.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional aesthetic with smooth animations
- **Portfolio Gallery**: Filterable portfolio showcasing different property types
- **Pricing Packages**: Three clear pricing tiers with detailed features
- **Contact Form**: Easy-to-use booking system for potential clients
- **Testimonials**: Social proof from satisfied realtors
- **Coverage Map**: Visual representation of service area

## Sections

1. **Hero Section**: Eye-catching landing with value proposition and statistics
2. **Services**: Aerial photography, video tours, twilight shots, 360° panoramas
3. **Benefits**: Data-driven results showing why aerial photography matters
4. **Portfolio**: Filterable gallery of work samples
5. **Pricing**: Three packages (Basic, Standard, Premium)
6. **Testimonials**: Client reviews
7. **Coverage Area**: Service location information
8. **About**: Company credentials and experience
9. **Contact**: Booking form and contact information

## Setup

1. Add your images to an `images/` folder:
   - `hero-bg.jpg` - Hero section background
   - `residential-1.jpg`, `residential-2.jpg`, `residential-3.jpg` - Residential properties
   - `commercial-1.jpg`, `commercial-2.jpg` - Commercial properties
   - `land-1.jpg`, `land-2.jpg` - Land/acreage properties
   - `twilight-1.jpg` - Twilight photography
   - `coverage-map.jpg` - Service area map
   - `pilot.jpg` - Pilot/about photo
   - `avatar-1.jpg` through `avatar-4.jpg` - Testimonial avatars

2. Customize the content:
   - Update contact information (phone, email)
   - Modify service areas in the coverage section
   - Adjust pricing if needed
   - Replace placeholder names and testimonials with real ones

3. Backend Integration:
   - Connect the contact form to your email service or CRM
   - Consider using services like Formspree, EmailJS, or your own backend
   - Update the form submission handler in `script.js`

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #003d7a;
    --accent-color: #00a8e8;
}
```

### Content
All content can be edited directly in `index.html`:
- Business name and branding
- Services offered
- Pricing packages
- Testimonials
- Contact information

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Montserrat)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

To optimize for production:
1. Compress all images (use tools like TinyPNG or ImageOptim)
2. Minify CSS and JavaScript
3. Enable gzip compression on your server
4. Use lazy loading for images
5. Consider using WebP format for images

## License

This template is provided for use in your drone photography business.
