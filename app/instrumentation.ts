/**
 * register runs once on cold start
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

/**
 * Check for required ENVs
 */
function envManager() {
  const ENVS = [
    "AUTH_42_SCHOOL_CLIENT_ID",
    "AUTH_42_SCHOOL_CLIENT_SECRET",
    "AUTH_URL",
    "AUTH_SECRET",
    "POSTGRES_URI"
  ];
  const errs: any[] = [];
  ENVS.forEach((env) => {
    if (!process.env[env]) {
      errs.push(env);
    }
  });
  if (errs.length) {
    throw new Error(`Missing ENVs: ${errs.join(", ")}`);
  } else {
    // eslint-disable-next-line no-console
    console.log("ENVs Check OK");
  }
}

export function register() {
  envManager();
}
