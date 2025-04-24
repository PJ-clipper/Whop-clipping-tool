# Whop Clipping Tool

A full-stack application for video clipping and processing.

## Project Structure

```
├── Frontend/           # Next.js frontend application
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── public/        # Static assets
│   └── styles/        # CSS styles
└── Backend/           # Python backend
    └── app.py         # Main backend application
```

## Features

- Video upload and processing
- Customizable clipping options
- Real-time processing status
- Multiple format support
- Modern, responsive UI

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI Components

### Backend
- Python
- FastAPI (planned)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- pnpm (package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PJ-clipper/Whop-clipping-tool.git
cd Whop-clipping-tool
```

2. Install frontend dependencies:
```bash
cd Frontend
pnpm install
```

3. Install backend dependencies:
```bash
cd ../Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend:
```bash
cd Frontend
pnpm dev
```

2. Start the backend:
```bash
cd Backend
python app.py
```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 