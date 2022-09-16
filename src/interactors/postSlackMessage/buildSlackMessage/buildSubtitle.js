const { buildSources } = require("../../../utils");

const getPRText = (pullRequest) => {
  const { url, number } = pullRequest || {};
  if (!url || !number) return "";
  return ` (<${url}|#${number}>)`;
};

const buildGithubLink = ({ description, path }) =>
  `<https://github.com/${path}|${description}>`;

module.exports = ({ t, org, repos, pullRequest, periodLength }) => {
  const sources = buildSources({ buildGithubLink, org, repos });
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🎉 Congrats to the following reviewers for their awesome work the last ${periodLength} days on ${sources}! 🎉`,
      },
    },
  ];
};
