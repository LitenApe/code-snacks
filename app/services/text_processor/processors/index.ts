import { GrayMatter } from './gray_matter';
import { Marked } from './marked';

export const frontmatterProcessor = new GrayMatter();
export const contentProcessor = new Marked();
