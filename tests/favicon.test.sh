#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "$0")/.." && pwd)"

test -s "$root_dir/favicon.ico"
test -s "$root_dir/favicon-48.png"
grep -Fq 'rel="icon" type="image/x-icon" href="/favicon.ico"' "$root_dir/index.html"
grep -Fq 'rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png"' "$root_dir/index.html"
