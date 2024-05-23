CREATE TABLE
    IF NOT EXISTS "user" (
        -- [ALWAYS | BY DEFAULT]
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "firstName" VARCHAR(64) NOT NULL,
        "lastName" VARCHAR(64) NOT NULL,
        "password" TEXT NOT NULL UNIQUE,
        "email" TEXT NOT NULL UNIQUE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );

    CREATE TABLE IF NOT EXISTS "task" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "userId" INT NOT NULL,
        "description" TEXT NOT NULL,
        "completed" BOOLEAN NOT NULL DEFAULT FALSE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ
    );