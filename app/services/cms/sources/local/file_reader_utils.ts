import { lstat, readFile, readdir } from 'fs/promises';

import { Logger } from '~/services/logger';
import { join } from 'path';

const logger = new Logger('File Reader Utils');

export async function readContentDirectory(
  dirpath: string,
): Promise<Array<string>> {
  const location = join(__dirname, '..', dirpath);
  const filesAndFolders = await readdir(location);
  logger.debug(`Retrieved [filenames=(${filesAndFolders.join(', ')})]`);
  return filesAndFolders;
}

async function exist(path: string): Promise<boolean> {
  try {
    await lstat(path);
    return true;
  } catch (ignored) {
    return false;
  }
}

async function loadContent(path: string): Promise<string> {
  return readFile(path, {
    encoding: 'utf-8',
    flag: 'r',
  });
}

export async function readFileContent(
  dirpath: string,
  filename: string,
): Promise<string> {
  const contentLocation = join(__dirname, '..', dirpath, filename);

  logger.debug(
    `Retrieving content from [dirpath=${dirpath}] and [filename=${filename}]`,
  );

  if (
    !(await exist(contentLocation))
    && !(await exist(`${contentLocation}.md`))
  ) {
    throw new Error(
      `Invalid attempt to read unknown content of [filename=${filename}]`,
    );
  }

  const contentPath = (await exist(contentLocation))
    ? contentLocation
    : `${contentLocation}.md`;
  const fileStats = await lstat(contentPath);

  if (fileStats.isDirectory()) {
    return loadContent(join(contentPath, 'index.md'));
  }

  return loadContent(contentPath);
}
