#!/usr/bin/env bash
# Déploiement du site vitrine Skin Picker — à lancer SUR le serveur.
#
# ⏱️ Le build dépasse 10 min (npm ci de Next 15 + compilation) : le lancer
# DÉTACHÉ, sinon la session SSH est coupée avant la fin et rien n'est installé :
#   nohup setsid bash ~/services/skinpicker-site/deployer.sh > /tmp/site.log 2>&1 < /dev/null &
#
# Convention maison : les commandes destructives (rm) vivent ici, dans un script
# versionné et relu, jamais dans un `ssh "..."` inline.
set -euo pipefail

SERVICE="$HOME/services/skinpicker-site"
ARCHIVE=/tmp/site-src.tar
cd "$SERVICE"

for f in docker-compose.yml .env; do
  if [ ! -f "$f" ]; then
    echo "MANQUANT : $SERVICE/$f — déploiement annulé." >&2
    exit 1
  fi
done
if [ ! -f "$ARCHIVE" ]; then
  echo "MANQUANT : $ARCHIVE (git archive envoyé par scp) — déploiement annulé." >&2
  exit 1
fi

echo "== Extraction du code =="
# src/ est reconstruit intégralement : aucun fichier orphelin ne survit.
rm -rf src
mkdir src
tar -xf "$ARCHIVE" -C src
rm -f "$ARCHIVE"

echo "== Build (long) et démarrage =="
# L'URL publique est inlinée au build depuis .env (SITE_URL) — voir le compose.
docker compose up -d --build

echo "== Santé =="
for i in $(seq 1 60); do
  if curl -fsS -o /dev/null http://localhost:8130/ 2>/dev/null; then
    echo "OK au bout de ${i}s"
    for p in / /fr /sitemap.xml /robots.txt; do
      curl -s -o /dev/null -w "  $p -> HTTP %{http_code}\n" "http://localhost:8130$p"
    done
    echo "Domaine annoncé par robots.txt :"
    curl -s http://localhost:8130/robots.txt | grep -i sitemap
    exit 0
  fi
  sleep 1
done

echo "Le site ne répond pas après 60 s — journaux :" >&2
docker compose logs --tail 40
exit 1
