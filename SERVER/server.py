from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import util

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this if your frontend runs on a different port or domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request model
class PredictRequest(BaseModel):
    total_sqft: float
    location: str
    bhk: int
    bath: int

@app.get("/get_location_names")
async def get_location_names():
    return {
        'locations': util.get_location_names()
    }

@app.post("/predict_home_price")
async def predict_home_price(payload: PredictRequest):
    estimated_price = util.get_estimated_price(
        payload.location, payload.total_sqft, payload.bhk, payload.bath
    )
    return {
        'estimated_price': estimated_price
    }

# Mount the build folder to serve static files
app.mount("/", StaticFiles(directory="build", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    print("Starting FastAPI Server For Home Price Prediction...")
    util.load_saved_artifacts()
    uvicorn.run(app, host="localhost", port=8002)
