#!/bin/sh
#
# Screenshot Generator using ffmpeg
# 
# arguments: (original_video *from root, destination *including format)
ffmpeg -ss 00:00:01.01 -i $1 -y -f image2 -vcodec mjpeg -vframes 1 $2