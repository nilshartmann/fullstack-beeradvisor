const isSlowDownEverything = !!process.env.SLOW_DOWN_EVERYTHING;
console.log("isSlowDownEverything", isSlowDownEverything);

export async function sleep(timeout = 1200) {
  return new Promise((res) => {
    setTimeout(() => res(null), timeout);
  });
}

export async function sleepWhenSlowdown(timeout = 1200) {
  if (!isSlowDownEverything) {
    return;
  }
  return new Promise((res) => {
    setTimeout(() => res(null), timeout);
  });
}
