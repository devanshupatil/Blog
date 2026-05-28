---
title: Git Tips That Will Save You Hours Every Week
description: Practical Git commands and workflows most developers don't know — git bisect, worktrees, reflog, fixup commits, and aliases that speed up your daily work.
category: Backend
published: true
featured: true
createdAt: 2025-05-08T09:00:00.000Z
image: /assets/git-bisect.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 6 min read
tags: ['git', 'backend', 'developer-tools']
proficiency: Intermediate
---

Everyone knows `git add`, `git commit`, `git push`. But there's a layer of Git most developers never reach — and it's where the real time savings live.

## 1. git bisect — Find Exactly Which Commit Broke Things

Binary search through your commit history to find the commit that introduced a bug.

```bash
git bisect start
git bisect bad                  # current commit is broken
git bisect good v1.2.0          # this tag/commit was fine

# Git checks out a middle commit. Test it, then:
git bisect good   # or: git bisect bad

# Repeat until Git says: "abc1234 is the first bad commit"
git bisect reset  # return to HEAD when done
```

What would take hours of manual `git log` hunting takes 5 minutes with bisect.

## 2. git worktree — Multiple Branches Checked Out Simultaneously

Stop stashing changes when you need to hotfix in another branch.

```bash
# Check out main branch into a separate directory
git worktree add ../hotfix-branch main

# Work in both simultaneously
cd ../hotfix-branch   # fix the bug, commit, push
cd -                   # back to your feature work, nothing disturbed
```

Each worktree is isolated but shares the same `.git` history. No stash, no stress.

## 3. git reflog — Recover "Lost" Commits

Accidentally reset or dropped a stash? Reflog saves you.

```bash
git reflog

# Output:
# abc1234 HEAD@{0}: reset: moving to HEAD~1
# def5678 HEAD@{1}: commit: add user authentication   ← the "lost" commit

git checkout def5678   # recover it
# or: git cherry-pick def5678
```

`reflog` keeps a log of every HEAD movement for 90 days. Nothing is truly lost.

## 4. Fixup Commits — Amend Without Rewriting History Manually

Made a mistake 3 commits ago? Don't rebase manually.

```bash
# First, make your fix
git add the-fixed-file.js
git commit --fixup=abc1234   # abc1234 is the commit you're fixing

# Then squash it in:
git rebase -i --autosquash HEAD~4
```

Git automatically moves the fixup commit next to its target and marks it for squashing.

## 5. Useful Aliases to Add Right Now

```bash
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.undo "reset HEAD~1 --mixed"
git config --global alias.oops "commit --amend --no-edit"
```

- `git lg` → beautiful visual branch graph
- `git undo` → un-commit your last commit (keeps changes staged)
- `git oops` → amend last commit without changing the message

## Key Takeaway

These five things — bisect, worktrees, reflog, fixup, and aliases — are the difference between fighting Git and working with it. Learn one per week and within a month your Git workflow will feel completely different.
