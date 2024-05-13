create function first_name_last_name(items_distributed) returns text as $$
  select $1.first_name || ' ' || $1.last_name;
$$ language sql immutable;