import os
from pathlib import Path
from typing import Optional, Union  
import logging

#set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)  

list_of_files = [
    "src/__init__.py",
    "src/helper.py",
    "src/prompt.py",
    ".env",
    "requirements.txt",
    "setup.py",
    "app.py",
    "research/trials.ipynb",
]

for file_path in list_of_files:
    filepath = Path(file_path)
    filedir = filepath.parent
    if not os.path.exists(filedir):
        os.makedirs(filedir, exist_ok=True)
        logger.info(f"Created directory: {filedir}")
    if not os.path.exists(filepath):
        with open(filepath, "w") as f:
            pass
        logger.info(f"Created file: {filepath}")
    else:
        logger.info(f"File already exists: {filepath}")