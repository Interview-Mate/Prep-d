/* eslint-disable @typescript-eslint/no-unused-vars */
export const run = function (code: string) {
  const result = {
    input: code,
    output: '',
    error: '',
  };

  try {
    result.output = runHidden(code);
  } catch (e: any) {
    result.error = e.message;
  }

  return result;
};

const stringify = function (output: string) {
  let result: string;

  if (typeof output == 'undefined') {
    result = 'undefined';
  } else if (output === null) {
    result = 'null';
  } else {
    result = JSON.stringify(output) || output.toString();
  }

  return result;
};

const runHidden = function (code: string) {
  const indexedDB = null;
  const location = null;
  const navigator = null;
  const onerror = null;
  const onmessage = null;
  const performance = null;
  const self = null;
  const webkitIndexedDB = null;
  const postMessage = null;
  const close = null;
  const openDatabase = null;
  const openDatabaseSync = null;
  const webkitRequestFileSystem = null;
  const webkitRequestFileSystemSync = null;
  const webkitResolveLocalFileSystemSyncURL = null;
  const webkitResolveLocalFileSystemURL = null;
  const addEventListener = null;
  const dispatchEvent = null;
  const removeEventListener = null;
  const dump = null;
  const onoffline = null;
  const ononline = null;
  const importScripts = null;
  const console = null;
  const application = null;

  return eval(code);
};
