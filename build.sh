#!/bin/bash
python -m pip install --upgrade pip
pip install -r Backend/requirements.txt
pip uninstall moviepy
pip install moviepy==1.0.3
pip install imageio==2.31.1
pip install imageio-ffmpeg==0.4.9 