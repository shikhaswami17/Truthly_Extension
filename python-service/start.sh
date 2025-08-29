#!/bin/bash
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Starting RoBERTa model service..."
python app.py
