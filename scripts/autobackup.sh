#!/bin/bash

# Auto-backup script for Brachial Plexus Simulator
REPO_DIR="/Users/ss/Gemini Antigravity/Playground/brachial-plexus-simulator"
LOG_FILE="$REPO_DIR/scripts/autobackup.log"

cd "$REPO_DIR" || exit 1

# Check if there are any git changes (untracked, modified, deleted)
if [[ -n $(git status -s) ]]; then
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  echo "[$TIMESTAMP] Changes detected. Starting auto-backup..." >> "$LOG_FILE"
  
  git add -A >> "$LOG_FILE" 2>&1
  git commit -m "Auto-backup: $TIMESTAMP" >> "$LOG_FILE" 2>&1
  
  # Push to GitHub main branch
  git push origin main >> "$LOG_FILE" 2>&1
  
  if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Auto-backup successfully pushed to GitHub." >> "$LOG_FILE"
  else
    echo "[$TIMESTAMP] ERROR: Git push failed." >> "$LOG_FILE"
  fi
else
  # No changes detected
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No changes to back up." >> "$LOG_FILE"
fi
