echo off
ren *" "*.mp3 *" ".mp3

setlocal enabledelayedexpansion
for /f "delims=" %%a in ('dir /b /a-d') do (
   set "line=%%~nxa"
   ren "%%a" "!line: =!"
)

for /r %%a in (*.mp3) do (
ffmpeg -f lavfi -t 2 -i anullsrc=channel_layout=mono -i "%%a" -filter_complex "[1:a][0:a]concat=n=2:v=0:a=1" "%%~pa%%~na1.mp3"
ffmpeg -i "concat:%%~pa%%~na1.mp3" -c copy "%%~pa%%~na2.mp3" -map_metadata 0:1
del "%%a"
)

ren *" "*.mp3 *"_".mp3

(for %%i in (*.mp3) do @echo file '%%i') > mylistMP3.txt
ffmpeg -f concat -i mylistMP3.txt -acodec copy 1output.wav

ffmpeg -loop 1 -y -i blue.png -i 1output.wav -shortest -acodec copy -vcodec mjpeg 2result.avi
ffmpeg -i 2result.avi 3result.mp4 

ffmpeg -i 1.mp4 -vf ass=1.ass 4withAss.mp4 

ffmpeg -ss 00:00:0.0 -i 4withAss.mp4 -filter:v "crop=in_w:in_h-268" -c:a copy -t 00:02:04.5 4cropWithTime.mp4

ffmpeg -ss 00:00:0.0 -i 4cropWithTime.mp4 -vf scale=1920:812,pad=1920:1080:0:139:black -c:a copy -t 00:02:04.5 5scale_crop_time.mp4



ffmpeg -i 5scale_crop_time.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate1.ts
ffmpeg -i 3result.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate2.ts
ffmpeg -i "concat:intermediate1.ts|intermediate2.ts" -c copy -bsf:a aac_adtstoasc 6outputConcat.mp4


//ffmpeg -i input30fps.mp4 -c:v libx264 -preset veryslow -crf 24  -framerate 60  -profile:v high -level 4.1 -tune film  -acodec copy   output60fps.mkv

ffmpeg -i 6outputConcat.mp4 -c:v libx264 -preset slow -profile:v high -crf 18 -coder 1 -pix_fmt yuv420p -movflags +faststart -g 30 -bf 2 -c:a aac -b:a 384k -profile:a aac_low 7outputBestQuality.mp4

md sourse
md sourse\mp3
move *.mp3 sourse\mp3\
move result.avi sourse\
md sourse\txt
move *txt sourse\txt\

move 1output.wav sourse\
move 2result.avi sourse\ 
move 3result.mp4 sourse\ 
move 4withAss.mp4 soure\
move 4cropWithTime.mp4 sourse\ 
move 5scale_crop_time.mp4 sourse\ 
move 6outputConcat.mp4 sourse\ 

md \sourse\ts
move intermediate1.ts sourse\ts\
move intermediate2.ts sourse\ts\

pause