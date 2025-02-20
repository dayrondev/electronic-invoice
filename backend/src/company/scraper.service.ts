import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async autocomplete(query: string): Promise<string[]> {
    const url = 'https://opendata.registradores.org/directorio';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.type(
      '#_org_registradores_opendata_portlet_BuscadorSociedadesPortlet_term',
      query,
    );

    await page.waitForSelector('.yui3-aclist-list li');

    const items = await page.$$eval('.yui3-aclist-list li', (elements) =>
      elements.map((el) => (el.textContent ? el.textContent.trim() : '')),
    );

    await browser.close();

    return items;
  }
}
