# WeWantWaste UK - Skip Hire Booking Platform

A modern React web application for booking skips, tracking orders, and managing waste disposal, built with Material UI.

## Features

- 📦 **Book a Skip**: Choose from a range of skip sizes and book online.
- 🗺️ **Postcode-based Availability**: Enter your postcode to see available skips in your area.
- 🗓️ **Select Delivery Date & Time**: Flexible scheduling for delivery.
- 💳 **Online Payment**: Secure payment options (demo).
- 🔎 **Track Your Order**: Real-time order tracking and status updates.
- 🧑 **Contact & Support**: Easy access to customer support.

## Tech Stack

- [React](https://react.dev/)
- [Material UI (MUI)](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) (for fast development)
- LocalStorage (for demo bookings)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```sh
git clone https://github.com/Grd-32/wewantwasteuk-alt.git
cd wewantwasteuk-alt
npm install
# or
yarn install
```

### Running the App

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

### Linting & Formatting

```sh
npm run lint
npm run format
```

## Project Structure

```
src/
  components/        # Reusable UI components (BookingModal, PostcodeForm, etc)
  pages/             # Main pages (SkipTypes, Tracking, etc)
  utils/             # Utility functions (API, helpers)
  App.jsx            # Main app component
  main.jsx           # Entry point
```

## Environment Variables

No API keys are required for demo mode.  
If you connect to a backend, add your API endpoints in `src/utils/api.js`.

## Customization

- **Skip Data**: Edit `SKIP_DATA` in `src/pages/SkipTypes.jsx` for available skips.
- **Branding**: Update colors and logos in `src/App.jsx` and `public/`.

## Demo Booking Flow

1. Enter your postcode and select a skip.
2. Fill in delivery and contact details.
3. Choose payment method (demo only).
4. Confirm booking and get a reference number.
5. Track your order via the tracking page.

## Screenshots

![Booking Page](./screenshots/booking-page.png)
![Tracking Page](./screenshots/tracking-page.png)

## License

MIT

---

**Made with ❤️ for WeWantWaste UK**
