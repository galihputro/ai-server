const puppeteer = require("puppeteer");
const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");

const npm = "1101221174";
const passwd = "jujur123";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://siakad.unbaja.ac.id/gate/login");

  console.log("Sedang Login...");

  await page.type('input[name="userid"]', npm);
  await page.type('input[name="password"]', passwd);
  await page.click('button[type="submit"]');

  console.log("Login Berhasil, Harap Tunggu...");

  await page.goto("https://siakad.unbaja.ac.id/siakad/list_nilaimhs");
  console.log("Sedang Mengambil Data Nilai...");

  const tableCode = await page.$eval("table", (el) => el.outerHTML);
  const css = fs.readFileSync("table.css", "utf-8");
  const imageHTML = `<html><head><style>${css}</style></head><body>${tableCode}</body></html>`;

  nodeHtmlToImage({
    output: "./nilai.png",
    html: imageHTML,
  }).then(() => console.log("Nilai Berhasil Disimpan"));

  await browser.close();
})();
