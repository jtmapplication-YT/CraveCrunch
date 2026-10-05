-- Create a profile and an empty taste profile for every new account.
-- The username comes from the sign-up form (user metadata), falling back to the email name,
-- with a number added if it is already taken.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  base text;
  candidate text;
begin
  base := regexp_replace(
    lower(coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1))),
    '[^a-z0-9_]', '', 'g'
  );
  if length(base) < 3 then
    base := 'cruncher';
  end if;
  base := left(base, 20);
  candidate := base;
  while exists (select 1 from public.profiles where username = candidate) loop
    candidate := left(base, 15) || '_' || floor(random() * 10000)::int;
  end loop;

  insert into public.profiles (id, username) values (new.id, candidate);
  insert into public.taste_profiles (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
