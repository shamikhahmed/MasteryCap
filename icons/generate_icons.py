#!/usr/bin/env python3
"""MasteryCap v2 PWA icons — spark-line mark (matches splash logo).
Flat #FF6B2C polyline + end dot on true-black #08090A. No dependencies."""
import struct, zlib, os, math

BG = (8, 9, 10)          # #08090A
ACC = (255, 107, 44)     # #FF6B2C

# spark polyline in 64-unit viewbox (same as splash mark)
PTS = [(14, 44), (26, 30), (34, 37), (50, 18)]
DOT = (50, 18)
STROKE = 4.4   # viewbox units
DOT_R = 4.6


def dist_seg(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    if dx == dy == 0:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def make(size, maskable=False):
    # content box: maskable keeps mark in central ~62%
    margin = size * (0.22 if maskable else 0.14)
    scale = (size - 2 * margin) / 64.0
    half = (STROKE * scale) / 2.0
    dot_r = DOT_R * scale
    aa = max(1.0, scale * 0.9)

    segs = [(PTS[i][0], PTS[i][1], PTS[i + 1][0], PTS[i + 1][1]) for i in range(len(PTS) - 1)]
    segs_px = [(margin + a * scale, margin + b * scale, margin + c * scale, margin + d * scale) for a, b, c, d in segs]
    dot_px = (margin + DOT[0] * scale, margin + DOT[1] * scale)

    buf = bytearray()
    for y in range(size):
        py = y + 0.5
        for x in range(size):
            px = x + 0.5
            d = min(dist_seg(px, py, *s) for s in segs_px)
            d_line = d - half
            d_dot = math.hypot(px - dot_px[0], py - dot_px[1]) - dot_r
            dd = min(d_line, d_dot)
            if dd <= 0:
                a = 1.0
            elif dd >= aa:
                a = 0.0
            else:
                a = 1.0 - dd / aa
            if a <= 0:
                buf += bytes(BG)
            else:
                buf += bytes(round(BG[i] + (ACC[i] - BG[i]) * a) for i in range(3))
    return encode_png(size, size, buf)


def encode_png(w, h, rgb):
    raw = bytearray()
    stride = w * 3
    for y in range(h):
        raw.append(0)
        raw += rgb[y * stride:(y + 1) * stride]
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
    return sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b"")


here = os.path.dirname(os.path.abspath(__file__))
for name, sz, mask in [
    ("icon-192.png", 192, False), ("icon-512.png", 512, False), ("icon-180.png", 180, False),
    ("icon-maskable-192.png", 192, True), ("icon-maskable-512.png", 512, True),
]:
    with open(os.path.join(here, name), "wb") as f:
        f.write(make(sz, mask))
    print("wrote", name)
