ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 3 -q:a 9 -acodec libmp3lame silence3sec.mp3
ffmpeg -f lavfi -i aevalsrc=0:duration=2 -ab 320k silence.mp3
ffmpeg -i input.wav -af "apad=pad_dur=3" output.m4a
ffmpeg -auto_convert 1 -f concat -i glueAudioFFMPEG.bat -c copy 1output.m4a

ffmpeg -f concat -safe 0 -i glueAudioFFMPEG.txt -acodec copy 1output.wav
ffmpeg -loop 1 -y -i blue.png -i 1output.wav -shortest -acodec copy -vcodec mjpeg 2result.avi
ffmpeg -i 2result.avi 3result.mp4 
pause