import { test as base } from '@playwright/test';
import { PlaywrightDocsPage } from '../page-object';

type PageFixtures = {
  playwrightDocsPage: PlaywrightDocsPage;
};

export const test = base.extend<PageFixtures>({
  playwrightDocsPage: async ({ page }, use) => {
    const playwrightDocsPage = new PlaywrightDocsPage(page);
    await use(playwrightDocsPage);
  },
});

export { expect } from '@playwright/test';
