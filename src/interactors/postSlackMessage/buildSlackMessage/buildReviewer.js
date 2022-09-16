const { durationToString } = require("../../../utils");

const MEDALS = [
  ":first_place_medal:",
  ":second_place_medal:",
  ":third_place_medal:",
]; /* 🥇🥈🥉 */

const getUsername = ({ index, reviewer, displayCharts }) => {
  const { stats, author } = reviewer;
  const { login, avatarUrl } = author;

  const medal = displayCharts ? MEDALS[index] : null;
  const suffix = medal ? ` ${medal}` : "";

  return {
    type: "context",
    elements: [
      {
        type: "image",
        image_url: avatarUrl,
        alt_text: login,
      },
      {
        emoji: true,
        type: "plain_text",
        text: `${login}${suffix}: ${stats.totalReviews}`,
      },
    ],
  };
};

const getStats = ({ t, reviewer, disableLinks }) => {
  const { stats, urls } = reviewer;
  const timeToReviewStr = durationToString(stats.timeToReview);
  const timeToReview = disableLinks
    ? timeToReviewStr
    : `<${urls.timeToReview}|${timeToReviewStr}>`;

  return {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*${t("table.columns.totalReviews")}:* ${stats.totalReviews}`,
      },
    ],
  };
};

const getDivider = () => ({
  type: "divider",
});

module.exports = ({ t, index, reviewer, disableLinks, displayCharts }) =>
  getUsername({ index, reviewer, displayCharts });
