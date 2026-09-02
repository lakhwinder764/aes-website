from collections import deque
from pathlib import Path
from PIL import Image

base = Path(r"c:\Users\ASUS\OneDrive\Desktop\websites\aes-site\public\assets\images")
files = [
    "float-passport-3d.png",
    "float-plane-3d.png",
    "float-stamp-3d.png",
    "float-globe-3d.png",
]


def dist(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


for name in files:
    path = base / name
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    corners = [px[0, 0][:3], px[w - 1, 0][:3], px[0, h - 1][:3], px[w - 1, h - 1][:3]]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
    # looser threshold for pale cards, tighter for dark studio
    threshold = 90 if sum(bg) > 500 else 55
    print(name, "bg", bg, "thresh", threshold)

    visited = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, a = px[x, y]
        if dist((r, g, b), bg) > threshold:
            continue
        px[x, y] = (r, g, b, 0)
        q.append((x + 1, y))
        q.append((x - 1, y))
        q.append((x, y + 1))
        q.append((x, y - 1))

    # feather: if neighbor is transparent, reduce alpha of pale leftover
    copy = im.copy().load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = copy[x, y]
            if a == 0:
                continue
            if dist((r, g, b), bg) <= threshold + 25:
                px[x, y] = (r, g, b, 0)

    im.save(path, "PNG")
    print("saved", name, "mode", Image.open(path).mode)
