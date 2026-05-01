# Google Maps App - Project Instructions

## Overview
This is a simple, interactive Google Maps application built with React, Vite, and TypeScript. It features a full-screen map interface.

## Tech Stack
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Map Library:** `@vis.gl/react-google-maps` (vis.gl)
- **Styling:** Vanilla CSS (full-screen layout)

## Architecture & Conventions
- **Full-Screen Layout:** The map is designed to occupy 100% of the viewport. Styling is managed in `src/index.css` and `src/App.css`.
- **API Management:** The Google Maps API key is managed via the `VITE_GOOGLE_MAPS_API_KEY` environment variable in the `.env` file.
- **Interactivity:** The `APIProvider` and `Map` components from `@vis.gl/react-google-maps` should be used for all map-related logic.

## Common Workflows
- **Development:** `pnpm run dev`
- **Build:** `pnpm run build`
- **Linting:** `pnpm run lint`

## Project Structure
- `src/App.tsx`: Main entry point for map logic and components.
- `src/App.css`: Scoped styles for the application layout.
- `src/index.css`: Global reset and root layout styles.
- `.env`: Environment variables (API Key placeholder).
