# Use an official lightweight Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port Uvicorn runs on
EXPOSE 8000

# Command to run the application (0.0.0.0 allows external connections)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]