import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class PlaywrightDocsPage extends BasePage {
  readonly getStartedLink: Locator;
  readonly installationHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.installationHeading = page.getByRole('heading', { name: 'Installation' });
  }

  async goto(): Promise<void> {
    await this.navigate('https://playwright.dev/');
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
