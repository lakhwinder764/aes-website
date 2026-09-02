from collections import deque
from pathlib import Path
from PIL import Image

assets = Path(r"C:\Users\ASUS\.cursor\projects\c-Users-ASUS-OneDrive-Desktop-websites\assets")
out_dir = Path(r"c:\Users\ASUS\OneDrive\Desktop\websites\aes-site\public\assets\images")


def key_green(src: Path, dest: Path):
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if g > 88 and g > r + 30 and g > b + 30:
                px[x, y] = (r, g, b, 0)
    im.save(dest, "PNG")
    print("green-keyed", dest.name)


def key_pale_edges(src: Path, dest: Path, threshold=22):
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    bg = px[2, 2][:3]
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        r, g, b, a = px[x, y]
        if abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) > threshold:
            continue
        px[x, y] = (r, g, b, 0)
        q.append((x + 1, y))
        q.append((x - 1, y))
        q.append((x, y + 1))
        q.append((x, y - 1))
    im.save(dest, "PNG")
    print("edge-keyed", dest.name, "bg", bg)


key_pale_edges(assets / "float-passport-3d.png", out_dir / "float-passport-3d.png", 18)
key_green(assets / "float-plane-key.png", out_dir / "float-plane-3d.png")
key_green(assets / "float-stamp-key.png", out_dir / "float-stamp-3d.png")
key_green(assets / "float-globe-key.png", out_dir / "float-globe-3d.png")
