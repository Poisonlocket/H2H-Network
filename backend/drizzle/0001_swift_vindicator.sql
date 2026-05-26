ALTER TABLE "GEOPOINT" ALTER COLUMN "timeStamp" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "BATCH" ADD CONSTRAINT "BATCH_uuid_unique" UNIQUE("uuid");