# RuralRentals

![RuralRentals](https://res.cloudinary.com/dnybjfmua/image/upload/v1737123040/Screenshot_2025-01-17_192238_abkffn.png)

RuralRentals is a unique rental platform that specializes in connecting travelers with extraordinary rural and unique accommodation experiences. The platform allows users to discover, book, and share their experiences with various types of unique properties around the world.

## Live Project

Check out the live project: [RuralRentals Live](https://ruralrentals.onrender.com)

## Key Features

### Property Management
- **Create Listings**: Property owners can create detailed listings with images, descriptions, and pricing
- **Edit & Delete**: Full control over your property listings
- **Multiple Categories**: Listings are organized into various categories including:
  - Rooms
  - Cities
  - Mountains
  - Castles
  - Pools
  - Camping sites
  - Farms
  - Arctic locations
  - Forest cabins
  - Ships
  - Homes
  - Igloos
  - Cinematic locations

### User Experience
- **User Authentication**: Secure signup and login system
- **Email Verification**: Account verification through email
- **Password Recovery**: Secure password reset with OTP
- **Session Management**: User sessions maintained for 14 days
- **Responsive Design**: Optimized for all devices

### Search & Discovery
- **Advanced Search**: Search by country, location, and title
- **Category Filtering**: Browse properties by specific categories
- **Location-Based**: Interactive maps showing property locations
- **Share Feature**: Share listings via social media or direct links

### Review System
- **Rating System**: 1-5 star rating system
- **User Reviews**: Detailed feedback and comments
- **Review Management**: Edit and delete your reviews

## Technical Features

### Backend
- **Node.js & Express**: Robust server-side framework
- **MongoDB**: Flexible NoSQL database
- **Mongoose**: Elegant MongoDB object modeling
- **Passport.js**: Secure authentication
- **Cloudinary**: Image storage and management
- **Mapbox**: Location services and mapping

### Frontend
- **EJS**: Template engine for dynamic content
- **Bootstrap**: Responsive design framework
- **JavaScript**: Interactive features
- **CSS**: Custom styling

### Security
- **Session Management**: Secure user sessions
- **Data Validation**: Input validation using Joi
- **Password Hashing**: Secure password storage
- **CSRF Protection**: Cross-site request forgery prevention

## Getting Started

### Prerequisites
- Node.js (>=18.17.1)
- MongoDB
- Cloudinary account
- Mapbox API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Your-Username/RuralRentals
   ```

2. Install dependencies:
   ```bash
   cd RuralRentals
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   ATLASDB_URL=your_mongodb_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAPBOX_TOKEN=your_mapbox_token
   SECRET=your_session_secret
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Visit http://localhost:8080 in your browser

## Project Structure
```
RuralRentals/
├── controllers/     # Business logic
├── models/          # Database models
├── router/          # API routes
├── views/           # Frontend templates
├── public/          # Static assets
├── utils/           # Utility functions
├── middleware.js    # Custom middleware
├── schema.js        # Data validation
├── app.js           # Main application
└── package.json     # Project dependencies
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License.

## Contact
For any queries or suggestions, please reach out to the project maintainer.
