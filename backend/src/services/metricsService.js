function calculateDisciplineIndex(completedCount, plannedCount) {
  if (plannedCount <= 0) return 0;
  return Math.min(100, Math.round((completedCount / plannedCount) * 100));
}

function calculateProductivityScore({ dailyCompleted, weeklyCompleted, streakDays }) {
  return Math.round((dailyCompleted * 2) + (weeklyCompleted * 3) + (streakDays * 1.5));
}

module.exports = {
  calculateDisciplineIndex,
  calculateProductivityScore
};
