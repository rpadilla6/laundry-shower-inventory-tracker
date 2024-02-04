CREATE TABLE "public"."items_distributed" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "backpack" BOOLEAN DEFAULT false,
    "duffel_bag" BOOLEAN DEFAULT false,
    "blanket" BOOLEAN DEFAULT false,
    "sleeping_bag" BOOLEAN DEFAULT false,
    "tarp" BOOLEAN DEFAULT false,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "distribution_date" DATE NOT NULL,
    "profile_id" uuid NOT NULL
);

ALTER TABLE "public"."items_distributed" OWNER TO "postgres";

ALTER TABLE ONLY "public"."items_distributed"
    ADD CONSTRAINT "items_distributed_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."items_distributed"
    ADD CONSTRAINT "items_distributed_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id);