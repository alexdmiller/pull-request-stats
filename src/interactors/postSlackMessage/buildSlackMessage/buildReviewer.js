const { durationToString } = require("../../../utils");

const MEDALS = [
  ":one:",
  ":two:",
  ":three:",
  ":four:",
  ":five:",
  "",
]; /* 🥇🥈🥉 */

const getUsername = ({ index, reviewer, displayCharts }) => {
  const { stats, author } = reviewer;
  const { login, avatarUrl } = author;

  const medal = true ? MEDALS[index] : null;
  const suffix = medal ? ` ${medal}` : "";

  return {
    type: "section",
    elements: [
      {
        emoji: true,
        type: "plain_text",
        text: `${suffix} `,
      },
      {
        type: "image",
        image_url: avatarUrl,
        alt_text: login,
      },
      {
        emoji: true,
        type: "plain_text",
        text: `${login}: ${stats.totalReviews}`,
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

module.exports = ({ t, index, reviewer, disableLinks, displayCharts }) => [
  getUsername({ index, reviewer, displayCharts }),
];
