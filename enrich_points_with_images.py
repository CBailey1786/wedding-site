import hashlib
import json
import os
import re
import time
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

# -------- CONFIG --------
HTML_PATH = Path("places.html")

# Your original points JSON (from your React app)
POINTS_JSON_IN = Path("src/data/map_points.json")

# Output enriched JSON
POINTS_JSON_OUT = Path("src/data/map_points.with_images.json")

# Where to download images. If you want to serve them from your React app,
# put them under /public so they can be referenced as "/images/..."
DOWNLOAD_DIR = Path("public/images/our-london")

# The field(s) in your point objects to match to the HTML place name
NAME_FIELDS = ["title", "name", "label"]  # adjust if needed

# If your HTML place names have suffixes/prefixes you want to ignore, add rules here.
# For now we just normalise.
# ------------------------

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

BG_URL_RE = re.compile(r'background-image\s*:\s*url\((["\']?)(.*?)\1\)', re.IGNORECASE)

def normalize_name(s: str) -> str:
    s = (s or "").strip().lower()
    # collapse whitespace
    s = re.sub(r"\s+", " ", s)
    # remove punctuation-ish
    s = re.sub(r"[’'`]", "", s)          # apostrophes
    s = re.sub(r"[^a-z0-9 &\-]", "", s)  # keep letters/numbers/space/&/-
    s = s.strip()
    return s

def safe_slug(s: str, max_len: int = 80) -> str:
    s = (s or "").strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9\-]+", "", s)
    s = s[:max_len].strip("-")
    return s or "image"

def ext_from_url(url: str) -> str:
    path = urlparse(url).path
    _, ext = os.path.splitext(path)
    ext = ext.lower()
    return ext if ext in [".jpg", ".jpeg", ".png", ".webp"] else ".jpg"

def short_hash(s: str) -> str:
    return hashlib.sha1(s.encode("utf-8")).hexdigest()[:8]

def download(url: str, dest: Path, timeout: int = 20, tries: int = 3) -> bool:
    for attempt in range(1, tries + 1):
        try:
            r = requests.get(url, headers=HEADERS, timeout=timeout)
            r.raise_for_status()
            dest.write_bytes(r.content)
            return True
        except Exception as e:
            if attempt == tries:
                print(f"FAILED: {url} -> {e}")
                return False
            time.sleep(1.5 * attempt)
    return False

def extract_place_images_from_html(html_path: Path) -> dict:
    """
    Returns dict: normalized_place_name -> best_image_url
    """
    html = html_path.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(html, "lxml")

    place_to_url = {}

    for a in soup.select("a.mw-place-link"):
        name_el = a.select_one(".mw-collection-place-name")
        place_name = name_el.get_text(strip=True) if name_el else None
        if not place_name:
            continue

        norm = normalize_name(place_name)

        best_url = None

        # 1) Prefer background-image URL (usually the actual displayed main photo)
        si = a.select_one("scheduled-image[style]")
        if si:
            style = si.get("style", "")
            m = BG_URL_RE.search(style)
            if m:
                best_url = m.group(2)

        # 2) Fallback: scan urls="..." attribute for an image URL
        if not best_url:
            for si2 in a.select("scheduled-image[urls]"):
                urls_attr = si2.get("urls", "")
                found = re.findall(
                    r"https?://[^\"'\s>]+?\.(?:jpg|jpeg|png|webp)",
                    urls_attr,
                    flags=re.IGNORECASE,
                )
                if found:
                    best_url = found[0]
                    break

        if best_url:
            # If duplicates exist, keep the first one we saw (usually fine)
            place_to_url.setdefault(norm, best_url)

    return place_to_url

def get_point_display_name(point: dict) -> str | None:
    for f in NAME_FIELDS:
        v = point.get(f)
        if isinstance(v, str) and v.strip():
            return v.strip()
    return None

def main():
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Reading HTML: {HTML_PATH}")
    place_to_url = extract_place_images_from_html(HTML_PATH)
    print(f"Found {len(place_to_url)} place->image mappings in HTML.")

    points = json.loads(POINTS_JSON_IN.read_text(encoding="utf-8"))
    if not isinstance(points, list):
        raise ValueError("Expected map_points.json to be a JSON array (list of objects).")

    matched = 0
    downloaded = 0
    missing = []

    for p in points:
        name = get_point_display_name(p)
        if not name:
            missing.append(("NO_NAME_FIELD", p.get("id")))
            continue

        norm = normalize_name(name)
        url = place_to_url.get(norm)

        if not url:
            missing.append((name, p.get("id")))
            continue

        matched += 1

        # Build filename
        slug = safe_slug(name)
        ext = ext_from_url(url)
        filename = f"{slug}__{short_hash(url)}{ext}"
        dest = DOWNLOAD_DIR / filename

        # Download if not present
        if not dest.exists() or dest.stat().st_size == 0:
            ok = download(url, dest)
            if ok:
                downloaded += 1

        # Enrich point
        # - image_url: original source URL
        # - image_file: local filename
        # - image: path you can use directly in React (served from /public)
        p["image_url"] = url
        p["image_file"] = filename
        p["image"] = f"/images/our-london/{filename}"

    POINTS_JSON_OUT.write_text(json.dumps(points, ensure_ascii=False, indent=2), encoding="utf-8")

    print("\n--- SUMMARY ---")
    print(f"Points: {len(points)}")
    print(f"Matched: {matched}")
    print(f"New downloads this run: {downloaded}")
    print(f"Enriched JSON written to: {POINTS_JSON_OUT}")

    if missing:
        print(f"\nUnmatched points ({len(missing)}):")
        for name, pid in missing[:30]:
            print(f"- {pid}: {name}")
        if len(missing) > 30:
            print(f"... and {len(missing) - 30} more")

if __name__ == "__main__":
    main()
