from collections import deque
from pathlib import Path
from PIL import Image

out_dir = Path(r"c:\Users\ASUS\OneDrive\Desktop\websites\aes-site\public\assets\images")
files = ["float-plane-3d.png", "float-stamp-3d.png", "float-globe-3d.png"]


def key_dark_edges(path: Path, threshold=40):
    im = Image.open(path).convert("RGBA")
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
        if a == 0:
            q.append((x + 1, y))
            q.append((x - 1, y))
            q.append((x, y + 1))
            q.append((x, y - 1))
            continue
        if abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) > threshold:
            continue
        px[x, y] = (r, g, b, 0)
        q.append((x + 1, y))
        q.append((x - 1, y))
        q.append((x, y + 1))
        q.append((x, y - 1))
    im.save(path, "PNG")
    print("dark-edge", path.name, "bg", bg)


for name in files:
    key_dark_edges(out_dir / name)
