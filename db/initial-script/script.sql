CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$
;

CREATE TABLE public.item (
	code uuid DEFAULT uuid_generate_v4() NOT NULL,
	descriptions text NULL,
	active bool DEFAULT true NOT NULL,
	created_by varchar(100) NULL,
	created_date timestamp NULL,
	updated_by varchar(100) NULL,
	updated_date timestamp NULL,
	CONSTRAINT item_pk PRIMARY KEY (code)
);