ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 3 -q:a 9 -acodec libmp3lame silence3sec.mp3
ffmpeg -f concat -safe 0 -i mylistMP3.txt -c copy 1output.mp3
ffmpeg -f concat -safe 0 -i mylistMP3.txt -acodec copy 1output.wav
ffmpeg -loop 1 -y -i blue.png -i 1output.wav -shortest -acodec copy -vcodec mjpeg 2result.avi
ffmpeg -i 2result.avi 3result.mp4 
pause