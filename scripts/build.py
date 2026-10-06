#!/usr/bin/env python3
"""Bundle src/ into single-file builds.

dist/index.html  - standalone page (open directly in a browser)
dist/artifact.html - body-only variant for publishing as a Claude artifact
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
JS_ORDER = ["data.js", "art.js", "core.js", "member.js", "business.js", "main.js"]
FAVICON = '<link rel="icon" type="image/svg+xml" href="%s">' % ("data:image/svg+xml," + __import__("urllib.parse").parse.quote((SRC.parent / "assets" / "favicon.svg").read_text().strip()))
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Raleway:wght@600;700;800;900&display=swap">'

css = (SRC / "styles.css").read_text()
js = "\n".join((SRC / f).read_text() for f in JS_ORDER)
body = '<div id="app"></div><div id="layer"></div><div class="toasts" id="toasts" aria-live="polite"></div>'

artifact = f"<title>Memo</title>\n{FAVICON}\n{FONTS}\n<style>\n{css}\n</style>\n{body}\n<script>\n{js}\n</script>\n"
standalone = f'<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>Memo</title>\n{FAVICON}\n{FONTS}\n<style>\n{css}\n</style>\n</head>\n<body>\n{body}\n<script>\n{js}\n</script>\n</body>\n</html>\n'

(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist" / "artifact.html").write_text(artifact)
(ROOT / "dist" / "index.html").write_text(standalone)
print("built", len(artifact) // 1024, "KB")
