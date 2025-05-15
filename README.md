# Wat Lens UI

I had to build some custom lens' for the AWS well architected tool, it was a total pain writing JSON by hand, copy, paste, delete a comma, blah blah blah....

So I use vercel to put this together. Use it at your own risk. 

It runs locally, stores no data.

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (optional, for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wat-lens-ui.git
   cd wat-lens-ui
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

### Using Docker

1. Build the Docker image:
   ```bash
   docker build -t wat-lens-ui .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 wat-lens-ui
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- pnpm for package management

## Project Structure

```
wat-lens-ui/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
└── styles/          # Global styles and Tailwind configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.