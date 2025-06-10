# Skip Hire Website Clone - WeWantWaste

A complete, responsive skip hire booking and tracking system built with React.js and Tailwind CSS. This project is a pixel-perfect clone of a professional waste management website with advanced booking functionality and real-time delivery tracking.

## 🚀 Live Demo

- **Live Website**: [Deployed on Netlify](https://your-netlify-url.netlify.app)
- **GitHub Repository**: [View Source Code](https://github.com/your-username/skip-hire-clone)

## 📋 Project Overview

This project clones and enhances a skip hire website with the following key features:

### ✨ Core Features
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **UK Postcode Validation**: Real-time validation with automatic formatting
- **Skip Type Catalog**: 6 different container sizes with detailed specifications
- **Advanced Booking System**: 3-step booking process with payment integration
- **Real-Time Tracking**: Comprehensive delivery tracking with driver information
- **Professional Navigation**: Clean header with active state indicators

### 🛠 Technical Stack
- **Frontend**: React.js (JavaScript, not TypeScript)
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router for navigation
- **State Management**: React Hooks for component state
- **Data Persistence**: LocalStorage for demo booking data
- **Build Tool**: Vite for fast development and building
- **Package Manager**: Bun for dependency management

## 🏗 Project Structure

```
skip-hire-clone/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navigation header
│   │   ├── Footer.jsx           # Site footer
│   │   ├── PostcodeForm.jsx     # Reusable postcode input with validation
│   │   └── BookingModal.jsx     # 3-step booking modal
│   ├── pages/
│   │   ├── Home.jsx             # Landing page with hero section
│   │   ├── SkipTypes.jsx        # Skip catalog with pricing
│   │   └── Tracking.jsx         # Delivery tracking system
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── public/
│   └── _redirects              # Netlify routing configuration
├── .same/
│   └── todos.md                # Development progress tracking
├── package.json
├── tailwind.config.js
├── vite.config.js
├── netlify.toml                # Deployment configuration
└── README.md
```

## 🎯 Key Features Implemented

### 1. **Homepage with Hero Section**
- Blue gradient background matching original design
- Interactive postcode form with validation
- "View Skip Types" navigation button
- Three-column features section
- Call-to-action buttons

### 2. **Skip Types Catalog**
- 6 different container sizes (Mini Skip to Roll-on Roll-off)
- Detailed specifications (dimensions, capacity, pricing)
- "Most Popular" highlighting for Midi Skip
- Responsive grid layout
- Interactive booking buttons

### 3. **Advanced Booking System**
#### Step 1: Delivery Details
- Smart date selection (next 14 days, excluding Sundays)
- Time slot selection (Morning, Afternoon, Evening)
- Customer information form
- Skip summary with pricing

#### Step 2: Payment Integration
- Credit/Debit card option with validation
- PayPal integration ready
- Real-time card number formatting
- CVV and expiry date validation
- Form validation with error messages

#### Step 3: Confirmation
- Complete booking summary
- Terms and conditions acceptance
- Payment processing simulation
- Booking reference generation

### 4. **Delivery Tracking System**
- 5-stage tracking timeline
- Real-time status updates based on delivery date
- Driver information with contact details
- Visual progress indicators
- Booking search functionality
- Responsive timeline design

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Bun package manager

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/your-username/skip-hire-clone.git
cd skip-hire-clone
```

2. Install dependencies:
```bash
bun install
```

3. Start development server:
```bash
bun run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production
```bash
bun run build
```

### Lint Code
```bash
bun run lint
```

## 🎨 Design Approach

### Visual Design
- **Color Scheme**: Professional blue gradient (#1e40af to #1e3a8a) with yellow accents
- **Typography**: Clean, modern font hierarchy
- **Layout**: Mobile-first responsive design
- **Icons**: Consistent iconography from same-assets.com
- **Spacing**: Tailwind's systematic spacing scale

### User Experience
- **Progressive Disclosure**: Information revealed step-by-step
- **Error Prevention**: Real-time validation and helpful error messages
- **Loading States**: Visual feedback during processing
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Fast loading with optimized assets

### Component Architecture
- **Reusability**: Modular components for form elements
- **Separation of Concerns**: Pages, components, and utilities clearly separated
- **State Management**: Local state with prop drilling for simplicity
- **Data Flow**: Unidirectional data flow following React patterns

## 💡 Technical Decisions

### Why React.js (JavaScript)?
- **Requirement**: Specifically requested JavaScript over TypeScript
- **Component-Based**: Perfect for reusable UI components
- **Ecosystem**: Rich ecosystem with excellent tooling
- **Performance**: Virtual DOM for efficient updates

### Why Tailwind CSS?
- **Rapid Development**: Utility-first approach for quick styling
- **Responsive Design**: Built-in responsive design system
- **Consistency**: Design system built into the framework
- **Maintenance**: No custom CSS to maintain

### Why LocalStorage for Demo?
- **Simplicity**: No backend required for demonstration
- **Persistence**: Data survives page refreshes
- **Testing**: Easy to test booking and tracking flow
- **Realistic**: Mimics real-world data persistence

## 🚦 User Journey

### Booking Flow
1. **Homepage**: Enter postcode and validate
2. **Skip Types**: Browse catalog and select skip
3. **Booking Modal**:
   - Step 1: Choose delivery date and enter details
   - Step 2: Enter payment information
   - Step 3: Confirm booking
4. **Confirmation**: Receive booking reference
5. **Tracking**: Automatic redirect to tracking page

### Tracking Flow
1. **Direct Access**: Navigate to tracking page
2. **Search**: Enter booking reference
3. **View Status**: See real-time delivery progress
4. **Driver Contact**: Call driver when out for delivery
5. **Completion**: Track through to delivery completion

## 🌟 Advanced Features

### Form Validation
- **UK Postcode**: Regex validation with formatting
- **Card Numbers**: Real-time formatting (1234 5678 9012 3456)
- **Email**: Built-in email validation
- **Required Fields**: Clear indication of required information
- **Error Handling**: Contextual error messages

### Data Management
- **Booking Generation**: Unique timestamp-based IDs
- **Status Calculation**: Dynamic status based on delivery date
- **Driver Assignment**: Random driver assignment for realism
- **Progress Tracking**: Percentage-based progress indicators

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Grid layouts adapt to tablet screens
- **Desktop Enhancement**: Full-width layouts on large screens
- **Touch Friendly**: Large touch targets for mobile interaction

## 🔍 Testing the Application

### Manual Testing Checklist
- [ ] Homepage loads with correct styling
- [ ] Postcode validation works (try: "NR32 1AB", "Invalid")
- [ ] Skip types page displays all 6 skips
- [ ] Booking modal opens and closes properly
- [ ] All three booking steps work with validation
- [ ] Booking confirmation creates tracking entry
- [ ] Tracking page finds and displays booking
- [ ] Driver information shows for delivery dates
- [ ] Responsive design works on mobile

### Sample Test Data
- **Valid Postcode**: NR32 1AB, SW1A 1AA, M1 1AA
- **Invalid Postcode**: 12345, ABC, INVALID
- **Test Card**: 4111 1111 1111 1111
- **Test Expiry**: 12/25
- **Test CVV**: 123

## 🚀 Deployment

### Netlify Deployment
The project is configured for automatic deployment to Netlify:

1. **Build Settings**:
   - Build command: `bun run build`
   - Publish directory: `dist`

2. **Redirects**: Configured in `public/_redirects` for SPA routing

3. **Environment**: No environment variables required for demo

### Manual Deployment
1. Build the project: `bun run build`
2. Upload `dist` folder to your hosting provider
3. Configure server for SPA routing

## 📝 Development Log

### Version 1: Initial Clone
- Created pixel-perfect clone of original website
- Implemented responsive design with Tailwind CSS
- Added basic postcode form functionality

### Version 2: Enhanced Features
- Added React Router for navigation
- Created comprehensive skip types page
- Implemented UK postcode validation
- Added form validation and error handling

### Version 3: Advanced System
- Built 3-step booking modal with payment integration
- Created delivery tracking system with timeline
- Added driver information and contact functionality
- Implemented booking persistence and search

## 🤝 Contributing

This project is a demonstration/portfolio piece. For educational purposes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational/portfolio purposes. The original design is cloned for demonstration of development skills.

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com
- Portfolio: [your-portfolio-site.com](https://your-portfolio-site.com)

## 🙏 Acknowledgments

- Original design inspiration from the skip hire industry
- Icons provided by same-assets.com
- Built with modern React.js and Tailwind CSS
- Deployed on Netlify for public access

---

**Note**: This is a demonstration project showcasing full-stack development skills including React.js, responsive design, form validation, payment integration UI, and delivery tracking systems.
