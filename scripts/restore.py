import subprocess
import os

try:
    # First revert the file completely to original
    subprocess.run(["git", "checkout", "viaje.html"], cwd="c:/andreia/Web-sueno-travel", check=True)
    print("Successfully checked out viaje.html")
except Exception as e:
    print(f"Error checking out: {e}")
