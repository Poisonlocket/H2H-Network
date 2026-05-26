CREATE TABLE "BATCH" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "BATCH_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "GEOPOINT" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "GEOPOINT_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"longitude" double precision NOT NULL,
	"latitude" double precision NOT NULL,
	"timeStamp" timestamp with time zone NOT NULL,
	"batchId" integer
);
--> statement-breakpoint
ALTER TABLE "GEOPOINT" ADD CONSTRAINT "GEOPOINT_batchId_BATCH_id_fk" FOREIGN KEY ("batchId") REFERENCES "public"."BATCH"("id") ON DELETE no action ON UPDATE no action;