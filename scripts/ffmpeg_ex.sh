#!/bin/sh
#
# ffmpeg generic with experimental option
# 
# arguments: (original_file *from root, destination *including format)
ffmpeg -strict experimental -i $1 $2
