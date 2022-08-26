const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://github.com/anasfik?tab=repositories", {
    waitUntil: "networkidle2",
  });

  let isThereMorePage = true;
  let repositories = [];
  while (isThereMorePage) {
    repositories = [
      ...repositories,
      ...(await page.evaluate(() => {
        return [
          ...document.querySelectorAll(".col-10.col-lg-9.d-inline-block"),
        ].map((repository) => {
          return {
            title: repository.querySelector(".wb-break-all a").innerText,
            link: repository.querySelector(".wb-break-all a").href,
            description: [...repository.querySelectorAll("div")].filter(
              (div) => !div.hasAttributes()
            )[0].innerText,

            starts:
              [...repository.querySelectorAll("a.Link--muted.mr-3")]
                .filter((a) =>
                  a.querySelector("svg").classList.contains("octicon-star")
                )
                .map((a) => a.innerText.trim())[0] ?? "no stars detected",
            forks:
              [...repository.querySelectorAll("a.Link--muted.mr-3")]
                .filter((a) =>
                  a
                    .querySelector("svg")
                    .classList.contains("octicon-repo-forked")
                )
                .map((a) => a.innerText.trim())[0] ?? "no forks detected",
            keywords: [
              ...repository.querySelectorAll(
                ".topics-row-container.d-inline-flex.flex-wrap.flex-items-center.f6.my-1 a.topic-tag.topic-tag-link.f6.my-1"
              ),
            ].map((keyword) => keyword.innerText),
            dominantLangage: [
              ...repository.querySelectorAll("span.ml-0.mr-3"),
            ].map((lang) => lang.innerText.trim())[0],
            lastUpdate: [...repository.querySelectorAll("relative-time")].map(
              (time) => time.innerText.trim()
            )[0],
          };
        });
      })),
    ];

    isThereMorePage = await page.evaluate(() => {
      return !document
        .querySelector(".next_page")
        .classList.contains("disabled");
    });

    isThereMorePage
      ? await Promise.all([
          await page.click(".next_page"),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ])
      : browser.close();
  }

  console.log(repositories.length);
  console.log(repositories);

  await browser.close();
})();
