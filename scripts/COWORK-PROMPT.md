# Prompt for Claude Cowork — shrink the Alfora reel clips

Paste everything below the line into Cowork, with the repo available to it.

---

The Alfora prototype plays short video clips in a vertical, full-screen reel.
They are far too heavy, so on a phone a slide shows its poster for seconds
before the video appears. I need them re-encoded. Please do the encoding and
check your own work — do not change any application code.

**Where things are**

- Clips live in `share/trailers/`.
- The reel mounts them as `<video preload="auto">` and displays them
  full-screen in a phone-shaped box with `object-fit: cover`, so only a centre
  vertical crop is ever visible.
- A helper script is already written for this: `scripts/shrink-clips.sh`. Read
  it first. It encodes to `share/trailers-small/` and never touches the
  originals. Use it if it fits, adapt it if you find something it got wrong,
  and tell me what you changed and why.

**What I measured before asking**

- 54 files, 559 MB total.
- 31 `.webm` clips, 73 MB, averaging 2.4 MB. These were supplied already cropped
  to 9:16 and are fine. Leave them alone.
- 23 `.mp4` files, 485 MB. Of these, 12 are full international trailers totalling
  **439 MB**, averaging 36 MB, 60–212 seconds long at about 2 Mbps, mostly
  landscape. These are the problem.
- The remaining 11 `.mp4` files are Flemish clips of 3–5 MB. They are fine on
  size, but **10 of the 23 MP4s have their `moov` atom at the end of the file**,
  which forces the browser to read to the end before it can paint one frame.
  Those want a lossless faststart remux (`-c copy -movflags +faststart`), not a
  re-encode.

**The one thing that will break if you get it wrong**

Each clip has a start offset in the app data (`item.start`), and the player
seeks to it on load. These twelve have non-zero offsets:

| file | start |
|---|---|
| rFo6M8KeghE.mp4 | 2s |
| U2Qp5pL3ovA.mp4 | 8s |
| Vt4qQiM2Ahk.mp4 | 3s |
| uYPbbksJxIg.mp4 | 10s |
| YPCqTI0PVV0.mp4 | 6s |
| 73_1biulkYk.mp4 | 10s |
| pBk4NYhWNMM.mp4 | 7s |
| LEjhY15eCx0.mp4 | 4s |
| LT6ASOBIdjQ.mp4 | 6s |
| 4rgYUipGJNo.mp4 | 10s |
| MDnVk5jIJr0.mp4 | 5s |
| MG6U7gduIwA.mp4 | 6s |

So **trim the tail, never the head.** If you cut a clip from its start offset,
the player will then seek past that point again and play from the wrong place.
Every output file must still begin at 0. Keeping roughly `start + 18s` is
plenty — the reel never runs longer than that before someone swipes.

**Target for the heavy twelve**

- Centre crop to 9:16, then scale to 720×1280. That is all the reel displays,
  and it is enough resolution for any handset at this size.
- H.264, around CRF 26 with a 1.4 Mbps ceiling; AAC 96k.
- `-movflags +faststart` on every output, re-encoded or remuxed.
- Expect roughly 439 MB → 40 MB for these twelve. If you land wildly off that,
  stop and tell me rather than shipping it.

**Before you hand it back**

1. Report a per-file before/after table and the new total.
2. Confirm every output file has `moov` before `mdat` (`ffprobe -v trace`, or
   parse the box order) — not just the ones you re-encoded.
3. Confirm each output's duration is at least its start offset plus a few
   seconds, so nothing was trimmed too short to play.
4. Spot-check three clips visually: the crop should be centred and the first
   frame should be the same moment as the original at the same timestamp.
5. Leave the originals in place. Put the new files in `share/trailers-small/`
   and tell me the swap command. Do not delete anything and do not commit.

If any file cannot be processed, list it and say why rather than skipping it
quietly.
