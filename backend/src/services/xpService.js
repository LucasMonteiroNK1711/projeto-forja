function xpRequiredForLevel(level) {
  return Math.floor(100 * (level ** 1.5));
}

function resolveLevelProgress(totalXp) {
  let level = 1;
  let xpRemaining = totalXp;

  while (xpRemaining >= xpRequiredForLevel(level)) {
    xpRemaining -= xpRequiredForLevel(level);
    level += 1;
  }

  const xpToNextLevel = xpRequiredForLevel(level);
  const progressPercent = Math.round((xpRemaining / xpToNextLevel) * 100);

  return {
    level,
    xpInCurrentLevel: xpRemaining,
    xpToNextLevel,
    progressPercent
  };
}

module.exports = {
  xpRequiredForLevel,
  resolveLevelProgress
};
