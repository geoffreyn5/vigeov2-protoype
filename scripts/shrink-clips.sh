#!/usr/bin/env bash
#
# Shrink the reel clips.
#
# The feed plays share/trailers/*. Measured before writing this: 54 files,
# 559 MB. The 31 supplied 9x16 .webm clips average 2.4 MB and are fine. The
# weight is 23 .mp4 trailers at 485 MB, and 12 of those are full international
# trailers averaging 36 MB -- 60 to 212 seconds long, 2 Mbps, mostly landscape.
# The reel shows the first few seconds of each, cropped to a vertical phone.
#
# So: trim, crop to what is actually on screen, and put the moov atom at the
# front so the first frame can paint before the whole file arrives.
#
# START OFFSETS MATTER. The app seeks each clip to its own start (item.start),
# so a clip trimmed from its start point would then be seeked a second time and
# play from the wrong place. This keeps every file starting at 0 and trims the
# TAIL only, so the app's existing offsets stay correct and no code changes.
#
# Originals are never touched. Output goes to trailers-small/, and you swap it
# in yourself once you have looked at the result.
#
# Usage:
#   scripts/shrink-clips.sh              # re-encode the heavy ones, remux the rest
#   scripts/shrink-clips.sh --all        # re-encode everything, including the small ones
#
set -euo pipefail

cd "$(dirname "$0")/.."
SRC="share/trailers"
OUT="share/trailers-small"

# Files at or above this keep their full re-encode; below it, the file is only
# remuxed for faststart, because re-encoding a 3 MB clip costs quality and
# saves almost nothing.
SKIP_UNDER_MB=8
[ "${1:-}" = "--all" ] && SKIP_UNDER_MB=0

# Seconds of clip to keep AFTER the app's start offset. The reel never runs
# longer than this before you swipe.
TAIL=18

# file<TAB>start -- every .mp4 the app references with a non-zero offset.
# Anything not listed is treated as starting at 0.
STARTS=$(cat <<'TSV'
rFo6M8KeghE.mp4	2
U2Qp5pL3ovA.mp4	8
Vt4qQiM2Ahk.mp4	3
uYPbbksJxIg.mp4	10
YPCqTI0PVV0.mp4	6
73_1biulkYk.mp4	10
pBk4NYhWNMM.mp4	7
LEjhY15eCx0.mp4	4
LT6ASOBIdjQ.mp4	6
4rgYUipGJNo.mp4	10
MDnVk5jIJr0.mp4	5
MG6U7gduIwA.mp4	6
TSV
)

command -v ffmpeg >/dev/null || { echo "ffmpeg not found. brew install ffmpeg"; exit 1; }
[ -d "$SRC" ] || { echo "no $SRC -- run this from the repo root"; exit 1; }
mkdir -p "$OUT"

start_for() { echo "$STARTS" | awk -F'\t' -v f="$1" '$1==f {print $2; found=1} END {if(!found) print 0}'; }
mb() { echo "scale=1; $(stat -f%z "$1" 2>/dev/null || stat -c%s "$1") / 1048576" | bc; }

before=0; after=0; encoded=0; remuxed=0

for f in "$SRC"/*.mp4; do
  [ -e "$f" ] || continue
  name=$(basename "$f")
  bytes=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
  size_mb=$(( bytes / 1048576 ))
  before=$(( before + bytes ))
  start=$(start_for "$name")
  keep=$(( start + TAIL ))

  if [ "$size_mb" -lt "$SKIP_UNDER_MB" ]; then
    # already small: just move the moov atom to the front, no re-encode, no
    # quality loss. 10 of these had it at the end, which makes the browser
    # read to the end of the file before it can show one frame.
    ffmpeg -nostdin -loglevel error -y -i "$f" -c copy -movflags +faststart "$OUT/$name"
    remuxed=$(( remuxed + 1 ))
    tag="remuxed"
  else
    # crop the centre to 9:16 -- which is all the reel ever shows, since the
    # video is object-fit:cover in a phone-shaped box -- then 720x1280, which
    # is enough for any handset at this size.
    ffmpeg -nostdin -loglevel error -y -i "$f" \
      -t "$keep" \
      -vf "crop='min(iw,ih*9/16)':'min(ih,iw*16/9)',scale=720:1280:flags=lanczos,setsar=1" \
      -c:v libx264 -preset slow -crf 26 -maxrate 1400k -bufsize 2800k \
      -profile:v main -level 4.0 -pix_fmt yuv420p \
      -c:a aac -b:a 96k -ac 2 \
      -movflags +faststart \
      "$OUT/$name"
    encoded=$(( encoded + 1 ))
    tag="re-encoded, kept ${keep}s (start ${start}s + ${TAIL}s)"
  fi

  nb=$(stat -f%z "$OUT/$name" 2>/dev/null || stat -c%s "$OUT/$name")
  after=$(( after + nb ))
  printf "  %-26s %7.1f MB -> %6.1f MB   %s\n" "$name" "$(mb "$f")" "$(mb "$OUT/$name")" "$tag"
done

echo
printf "re-encoded %d, remuxed %d\n" "$encoded" "$remuxed"
printf "total: %.0f MB -> %.0f MB\n" "$(echo "scale=2; $before/1048576" | bc)" "$(echo "scale=2; $after/1048576" | bc)"
echo
echo "Check a few in $OUT, then swap them in:"
echo "  mv share/trailers share/trailers-original"
echo "  mv $OUT share/trailers"
echo
echo "Keep share/trailers-original out of git until you are happy; the originals"
echo "are the only copy of the full trailers."
