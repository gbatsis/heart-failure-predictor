# Use a Python base image
FROM python:3.8

# Set the working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY . .

# Expose port 5050 for the Flask application
EXPOSE 5050

# Run the Flask application
CMD ["python", "app.py"]
