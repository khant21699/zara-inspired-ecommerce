-- 002_auth.sql — Better Auth tables (users, sessions, accounts, verification
-- tokens, rate-limit counters).
--
-- Generated for better-auth 1.7 from src/auth/auth.ts with
--   npm run auth:schema
-- and kept verbatim apart from formatting and the two extra indexes at the
-- end. Better Auth expects these exact table and column names (camelCase,
-- quoted); rename them only through the `user`/`session`/`account` field
-- mappings in src/auth/auth.ts. Forward-only: when a Better Auth upgrade
-- needs more columns, regenerate and add a 003.

create table "user" (
  "id"            uuid        default pg_catalog.gen_random_uuid() not null primary key,
  "name"          text        not null,
  "email"         text        not null unique,
  "emailVerified" boolean     not null,
  "image"         text,
  "createdAt"     timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt"     timestamptz default CURRENT_TIMESTAMP not null
);

create table "session" (
  "id"        uuid        default pg_catalog.gen_random_uuid() not null primary key,
  "expiresAt" timestamptz not null,
  "token"     text        not null unique,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz not null,
  "ipAddress" text,
  "userAgent" text,
  "userId"    uuid        not null references "user" ("id") on delete cascade
);

-- One row per credential: providerId 'credential' holds the password hash;
-- social providers (when enabled) store their tokens here.
create table "account" (
  "id"                    uuid        default pg_catalog.gen_random_uuid() not null primary key,
  "accountId"             text        not null,
  "providerId"            text        not null,
  "userId"                uuid        not null references "user" ("id") on delete cascade,
  "accessToken"           text,
  "refreshToken"          text,
  "idToken"               text,
  "accessTokenExpiresAt"  timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  "scope"                 text,
  "password"              text,
  "createdAt"             timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt"             timestamptz not null
);

-- Short-lived tokens (email verification, password reset).
create table "verification" (
  "id"         uuid        default pg_catalog.gen_random_uuid() not null primary key,
  "identifier" text        not null,
  "value"      text        not null,
  "expiresAt"  timestamptz not null,
  "createdAt"  timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt"  timestamptz default CURRENT_TIMESTAMP not null
);

-- Rate-limit counters (rateLimit.storage = "database": serverless instances
-- share nothing else).
create table "rateLimit" (
  "id"          uuid    default pg_catalog.gen_random_uuid() not null primary key,
  "key"         text    not null unique,
  "count"       integer not null,
  "lastRequest" bigint  not null
);

create index "session_userId_idx"           on "session" ("userId");
create index "account_userId_idx"           on "account" ("userId");
create index "verification_identifier_idx"  on "verification" ("identifier");

-- Extra: the lookups Better Auth makes that the generator does not index.
create index "account_provider_account_idx" on "account" ("providerId", "accountId");
create index "session_expiresAt_idx"        on "session" ("expiresAt");
