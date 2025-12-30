# Titanix Development Website

A modern, high-performance corporate website for Titanix Development, built with the latest web technologies. This project serves as a portfolio and service showcase for the agency, featuring an interactive "Smart Consultant" tool that provides preliminary project analysis.

## 🚀 Features

- **Modern UI/UX**: Designed with a premium aesthetic using a dark theme, glassmorphism effects, and smooth animations.
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
- **Smart AI Consultant**: An interactive tool (Mock/Demo version) that analyzes user project ideas and provides estimated timelines, complexity, and tech stack recommendations.
- **Service Showcase**: Detailed sections for services, technology stack, and portfolio projects.
- **Direct Contact Integration**: Integrated links for Email, WhatsApp, and Instagram.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Server**: [Express](https://expressjs.com/) (for serving the production build)

## 📂 Project Structure

```
Titanix-Development-main/
├── components/          # React components (Header, Hero, Services, etc.)
├── services/           # Business logic and services (e.g., geminiService.ts)
├── dist/               # Production build output
├── public/             # Static assets
├── server.cjs          # Express server for production deployment
├── index.html          # HTML entry point
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd Titanix-Development-main
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or strictly the port Vite assigns).

### Production Build

To build the application for production:

```bash
npm run build
```

This will compile the TypeScript code and assets into the `dist` directory.

### Running in Production Mode

To serve the built application using the included Express server:

```bash
npm start
```

This runs `server.cjs` which serves the static files from the `dist` folder.

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Locally previews the production build.
- `npm start`: Runs the Node.js/Express server to serve the production build.

## 📞 Contact

- **Email**: contact@titanix.dev
- **WhatsApp**: [+372 5395 1655](https://wa.me/37253951655)
- **Instagram**: [@titanixdev](https://instagram.com/titanixdev)

## 📄 License

This project is proprietary to Titanix Development.
