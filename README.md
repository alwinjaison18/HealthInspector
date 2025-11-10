# HealthInspector

A web application that analyzes food products and provides health scores based on nutritional information from the OpenFoodFacts database.

## 🎯 Features

- 🔍 Search products by barcode or name
- 📊 Health score calculation based on nutritional values
- 🥗 Detailed nutritional information display
- ⚠️ Nutrient level warnings (high/moderate/low)
- 🎨 Responsive and modern UI
- 🌐 Works with any deployment platform

## 🏗️ Architecture

- **Frontend**: React + Vite + Bootstrap
- **Backend**: FastAPI (Python)
- **Data Source**: OpenFoodFacts API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/alwinjaison18/HealthInspector.git
   cd HealthInspector
   ```

2. **Setup Backend**

   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload
   ```

   Backend runs on: `http://localhost:8000`

3. **Setup Frontend** (in a new terminal)

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Frontend runs on: `http://localhost:5173`

4. **Access the app**
   Open `http://localhost:5173` in your browser

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to various platforms:

- Vercel, Netlify, Railway, Render
- AWS, DigitalOcean, Heroku
- Docker, and more

## 🔧 Configuration

### Frontend Environment Variables

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For production, set `VITE_API_URL` to your deployed backend URL.

## 📖 API Documentation

Once the backend is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Endpoints

- `GET /` - Health check
- `GET /product/{barcode}` - Get product by barcode
- `GET /product/search?query={term}` - Search products

## 🧪 Testing

### Test Backend

```bash
# Test health endpoint
curl http://localhost:8000/

# Test product endpoint
curl http://localhost:8000/product/3017620425035
```

### Test Frontend

```bash
cd frontend
npm run build  # Build for production
npm run preview  # Preview production build
```

## 📁 Project Structure

```
HealthInspector/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   └── services/
└── README.md
```

## 🛠️ Built With

### Frontend

- React 18
- Vite 6
- Axios
- React Router
- Bootstrap 5

### Backend

- FastAPI
- Uvicorn
- Requests
- Pydantic

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Alwin Jaison**

- GitHub: [@alwinjaison18](https://github.com/alwinjaison18)

## 🙏 Acknowledgments

- [OpenFoodFacts](https://world.openfoodfacts.org/) for the comprehensive food database
- All contributors and testers

## 📧 Support

For support, email or open an issue on GitHub
